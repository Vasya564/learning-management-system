const User = require('../models/userModel')

// login user
const loginUser = (req, res) => {
    res.json({mssg: 'login user'})
}

// create new user
const createUser = (req, res) => {
    res.json({mssg: 'create user'})
}

module.exports = { loginUser, createUser }