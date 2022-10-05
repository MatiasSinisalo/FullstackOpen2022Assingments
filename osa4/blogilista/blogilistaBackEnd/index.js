const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
require('dotenv').config()
const mongoUrl = mongoose.connect(process.env.MONGODB_URI)


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})