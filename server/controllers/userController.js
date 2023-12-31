const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const checkEmptyFields =  require('../middleware/checkEmptyFields');
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const createToken = (user) => {
    const userData = {
        _id: user._id,
        fullname: user.fullname,
        role: user.role,
        group: user.group,
        email: user.email,
        photo: user.photo
    }
    return jwt.sign(userData, process.env.SECRET, {expiresIn: '3d'})
}

// get all users
const getUsers = async (req, res) => {
    const users = await User.find().select('-password').lean()

    res.status(200).json(users)
}

// get user
const getUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    const user = await User.findById(id).select('-password').lean()

    if(!user){
        return res.status(404).json({error: "No such user"})
    }

    res.status(200).json(user)
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user)

        res.status(200).json(token)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create new user
const createUser = async (req, res) => {
    const {fullname, role, group, email, password} = req.body
    // const { buffer, mimetype } = req.file || {};

    const combinedData = {
        fullname: fullname,
        role: role,
        group: group,
        email: email,
        password: password
    }

    const emptyFields = checkEmptyFields(combinedData)

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Всі поля повинні бути заповнені', emptyFields})
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const photo = result.secure_url;

    fs.unlinkSync(req.file.path);

    try {
        const user = await User.createUser( fullname, role, group, email, password, photo)

        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update user
const updateUser = async (req, res) => {
    const {id} = req.params
    console.log(req.file)
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
      }
    
      const { photo, ...updateData } = req.body;
    
      try {
        let updatedUser = await User.findById(id);
    
        if (!updatedUser) {
          return res.status(404).json({ error: "No such user" });
        }
    
        // Update the user fields except for the photo
        updatedUser.fullname = updateData.fullname || updatedUser.fullname;
        updatedUser.role = updateData.role || updatedUser.role;
        updatedUser.group = updateData.group || updatedUser.group;
        updatedUser.email = updateData.email || updatedUser.email;
        updatedUser.password = updateData.password || updatedUser.password;
    
        // Update the photo if provided
        if (req.file) {
            const { buffer, mimetype } = req.file;
        
            // Ensure the photo field is properly updated
            updatedUser.photo = {
              data: buffer,
              contentType: mimetype
            };
          }
    
        // Save the updated user to the database
        updatedUser = await updatedUser.save();
    
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

// delete user
const deleteUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (user.photo) {
        const photoUrl = user.photo;
        const publicId = photoUrl.substring(photoUrl.lastIndexOf('/') + 1, photoUrl.lastIndexOf('.'));
        await cloudinary.uploader.destroy(publicId);
    }

    if(!user){
        return res.status(404).json({error: "No such user"})
    }

    res.status(200).json(user)
}

module.exports = { loginUser, createUser, getUsers, getUser, deleteUser, updateUser }