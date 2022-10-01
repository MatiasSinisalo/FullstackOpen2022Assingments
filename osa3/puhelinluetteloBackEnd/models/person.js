const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:{
      type: String,
      minlength: 3,
      required: true
    },
    number: String
  })
  
  const Person = mongoose.model('Person', personSchema)

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



module.exports = mongoose.model('Person', personSchema)