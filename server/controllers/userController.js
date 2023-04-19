const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
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