const express = require('express')
const {
    getCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse,
    updateResources,
    deleteBlockFromResources
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  });

const upload = multer({ storage });

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

//---------- RESOURCES routes -------------

// UPDATE a course resources
router.patch('/resources/:id', upload.array('files'), updateResources)

// RESOURCES location
router.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    res.sendFile(filePath);
});

// DELETE resourse block
router.delete('/resources/:id/:blockId', deleteBlockFromResources);

module.exports = router