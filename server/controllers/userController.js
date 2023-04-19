const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create new user
const createUser = async (req, res) => {
    const {fullname, role, email, password} = req.body

    try {
        const user = await User.createUser(fullname, role, email, password)

        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, createUser }