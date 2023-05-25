require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const coursesRoutes = require('./routes/courses')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text({ defaultCharset: 'utf-8' }));

// routes
app.use('/api/courses', coursesRoutes)
app.use('/api/user', userRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listening for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })