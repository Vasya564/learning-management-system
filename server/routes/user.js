const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, createUser, getUsers, getUser } = require('../controllers/userController')

const router = express.Router()

// all users route
router.get('/', requireAuth, getUsers)

// user route
router.get('/:id', requireAuth, getUser)

// login route
router.post('/login', loginUser)

// create new user route
router.post('/create-user', requireAuth, createUser)

module.exports = router