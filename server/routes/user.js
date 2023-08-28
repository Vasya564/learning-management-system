const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer');

// controller functions
const { 
    loginUser, 
    createUser, 
    getUsers, 
    getUser,
    updateUser, 
    deleteUser } = require('../controllers/userController')

const router = express.Router()

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });

// GET all users
router.get('/', requireAuth, getUsers)

// GET specific user
router.get('/:id', requireAuth, getUser)

// DELETE user
router.delete('/:id', requireAuth, deleteUser)

// UPDATE user
router.patch('/:id', upload.single('photo'), requireAuth, updateUser)

// login route
router.post('/login', loginUser)

// create new user route
router.post('/create-user', upload.single('photo'), requireAuth, createUser)

module.exports = router