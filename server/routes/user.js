const express = require('express')

// controller functions
const { loginUser, createUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// create new user route
router.post('/create-user', createUser)

module.exports = router