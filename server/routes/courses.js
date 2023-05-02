const express = require('express')
const {
    getCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all courses
router.get('/', getCourses)

// GET a single course
router.get('/:id', getCourse)

// POST a new course
router.post('/', createCourse)

// DELETE a course
router.delete('/:id', deleteCourse)

// UPDATE a course
router.patch('/:id', updateCourse)
module.exports = router