const mongoose = require('mongoose')
require('dotenv').config()
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const mongoUrl = 
mongoose.connect(process.env.MONGODB_URI)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  
  
  module.exports = mongoose.model('Blog', blogSchema)
