require('dotenv').config()

const express = require ('express')
const coursesRoutes = require('./routes/courses')

// express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/courses', coursesRoutes)

// listening for requests
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})