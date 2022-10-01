require('dotenv').config()
const http = require('http')


const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonBody'))

morgan.token('jsonBody', (req, res) => {
  const postJsonString = JSON.stringify(req.body);
  if(postJsonString && postJsonString.length > 2){
  return JSON.stringify(req.body)
  }
  return ''
})

let persons = [
      {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
      },
      {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
      },
      {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345",
      },
      {
        "id": 4,
        "name": "Mary Poppendick",
        "number": "39-23-6423122",
      }
    ]


    
app.get('/api/persons/', (request, response, next) => {
  Person.find({}).then(persons =>{
    response.json(persons)
  })
  .catch(error => next(error))
}) 




app.post('/api/persons/', (request, response, next) => {
 

  const name = request.body.name
  const number = request.body.number

  let errorMessage = ''
  if(!name){
    errorMessage = errorMessage + 'name missing'
   
  }
  
/*
  if(personWithSameName){
    errorMessage = errorMessage + ' name must be unique'
  }
*/

  if(!number){
    errorMessage =  errorMessage + ' number missing'
  }

  if(errorMessage){
    error = {
      name: "missingParams",
      message: errorMessage
    }
    next(error)
  }

  const randomId = Math.floor(Math.random() * (Math.pow(10, 9)));
 
  const person = new Person({
    id: randomId,
    name: name,
    number: number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))

}) 

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error => {
    next(error)
  })
  
}) 

app.put('/api/persons/:id', (request, response, next) => {
  const oldName = request.body.name
  const newNumber = request.body.number

  let errorMessage = ''
 
  if(!oldName){
    errorMessage = errorMessage + 'name missing'
   
  }
  if(!newNumber){
    errorMessage =  errorMessage + ' number missing'
  }

  if(errorMessage){
    error = {
      name: "missingParams",
      message: errorMessage
    }
    next(error)
  }


  const newperson = {
    name: oldName,
    number: newNumber
  }
  
  Person.findByIdAndUpdate(request.params.id, newperson, {new:true}).then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})




app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  
  Person.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  })
  .catch(error => {
    next(error)
  })
}) 




app.get('/info/', (request, response, next) => {
  let amount =  0;
  Person.count({}).then( count => {
    amount = count
    const phoneBookResponse = `<p>phonebook has info for ${amount} people</p>`
    const timeResponse = `<p>${new Date()}</p>`
    response.send(`${phoneBookResponse}${timeResponse}`)
  })
  .catch(error => next(error))
  
}) 

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  console.error(error.message)
 

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'missingParams') {
    return response.status(400).send({ error: `${error.message}` })
  }
  else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)