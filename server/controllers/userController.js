const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
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
        const token = createToken(user._id)

        const userName = user.fullname

        res.status(200).json({email, userName, _id: user._id, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create new user
const createUser = async (req, res) => {
    const {fullname, role, group, email, password} = req.body

    try {
        const user = await User.createUser(fullname, role, group, email, password)

        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, createUser, getUsers, getUser }