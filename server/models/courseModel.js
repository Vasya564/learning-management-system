const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    students: {
        type: Array,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    resources: {
        type: Object
    }
})

module.exports = mongoose.model('Course', courseSchema)