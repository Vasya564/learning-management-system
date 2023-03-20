const express = require('express')
const Course = require('../models/courseModel')

const router = express.Router()

// GET all courses
router.get('/', (req, res) => {
    res.json({msg: 'GET all courses'})
})

// GET a single course
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single course'})
})

// POST a new course
router.post('/', async (req, res) => {
    const {title, specialization, teacher, students, status} = req.body

    try {
        const course = await Course.create({title, specialization, teacher, students, status})
        res.status(200).json(course)
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

// DELETE a course
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a course'})
})

// UPDATE a course
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a course'})
})
module.exports = router