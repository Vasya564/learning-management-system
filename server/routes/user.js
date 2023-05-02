const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, createUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// create new user route
router.post('/create-user', requireAuth, createUser)

module.exports = router