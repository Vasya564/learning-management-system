const Course = require('../models/courseModel')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const checkEmptyFields =  require('../middleware/checkEmptyFields');

// get all courses
const getCourses = async (req, res) => {
    const courses = await Course.find({})

    res.status(200).json(courses)
}

// get a single course
const getCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such course"})
    }

    const course = await Course.findById(id)

    if(!course){
        return res.status(404).json({error: "No such course"})
    }

    res.status(200).json(course)
}


// create new course
const createCourse = async (req, res) => {
    const {title, specialization, teacher, students, status} = req.body

    const emptyFields = checkEmptyFields(req.body)

    if(emptyFields.length > 0){
      return res.status(400).json({error: 'Всі поля повинні бути заповнені', emptyFields})
    }

    // add doc to db
    try {
        const course = await Course.create({title, specialization, teacher, students, status})
        res.status(200).json(course)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a course
const deleteCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such course"})
    }

    const course = await Course.findOneAndDelete({_id: id})

    if(!course){
        return res.status(404).json({error: "No such course"})
    }

    res.status(200).json(course)
}

// update a course
const updateCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such course"})
    }

    const course = await Course.findOneAndUpdate({_id: id}, {...req.body})

    if(!course){
        return res.status(404).json({error: "No such course"})
    }

    res.status(200).json(course)
}

const updateResources = async (req, res) => {
    const courseId = req.params.id;
    const topic = req.body.topic;
    const files = req.files;

    const combinedData = {
      topic: topic,
      files: files
    };

    const emptyFields = checkEmptyFields(combinedData)

    if(emptyFields.length > 0){
      return res.status(400).json({error: 'Всі поля повинні бути заповнені', emptyFields})
    }

    // Find the course by courseId in the database
    try {
        // Find the course by courseId in the database
        const course = await Course.findById(courseId);
    
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
    
        // Create an array to store the file information
        const fileData = [];
    
        // Process each file and store its information
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
    
          const fileInfo = {
            originalName: file.originalname,
            filename: file.filename,
            path: `/uploads/${file.filename}`,
            mimetype: file.mimetype
          };
    
          fileData.push(fileInfo);
        }
    
        // Create a new block object with the received topic and file data
        const newBlock = {
          topic: topic,
          files: fileData
        };
    
        // Add the new block to the resources array
        course.resources.push(newBlock);
    
        // Update the course and retrieve the updated document
        const updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $set: { resources: course.resources } },
          { new: true }
        );
    
        res.status(200).json(updatedCourse);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
}

const deleteBlockFromResources = async (req, res) => {
    try {
        const { id, blockId } = req.params;
    
        // Find the course by ID
        const course = await Course.findById(id);
    
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
    
        if (blockId < 0 || blockId >= course.resources.length) {
            return res.status(400).json({ error: 'Invalid block index' });
        }

        const block = course.resources[blockId];

        // Delete the associated files from the server's file system
        block.files.forEach((file) => {
            const filePath = path.join(__dirname, '../uploads', file.filename);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
  
        // Remove the block at the specified index
        course.resources.splice(blockId, 1);
    
        // Save the updated course
        const updatedCourse = await course.save();
    
        res.status(200).json(updatedCourse);
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        }
  };

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse,
    updateResources,
    deleteBlockFromResources
}