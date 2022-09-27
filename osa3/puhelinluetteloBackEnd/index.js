require('dotenv').config()
const http = require('http')
const Person = require('./models/person')


const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('build'))
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


    
app.get('/api/persons/', (request, response) => {
  Person.find({}).then(persons =>{
    response.json(persons)
  })
  
}) 

app.post('/api/persons/', (request, response) => {
 

  const name = request.body.name
  const number = request.body.number

  let errorMessage = ''
  
  if(!name){
    errorMessage =errorMessage + 'name missing'
   
  }
  const personWithSameName = persons.find(person => person.name === request.body.name)

  if(personWithSameName){
    errorMessage = errorMessage + ' name must be unique'
  }


  if(!number){
    errorMessage =  errorMessage + ' number missing'
  }

  if(errorMessage){
    return response.status(400).json({
      error: errorMessage
    })
  }


  const randomId = Math.floor(Math.random() * (Math.pow(10, 9)));
 
  const newPerson = {
    id : randomId,
    name: name,
    number: number
  }
  const person = new Person({
    id: randomId,
    name: name,
    number: number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

 // persons = persons.concat(newPerson)
 // response.json(newPerson)


}) 

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    response.json(person)
  })
  
}) 




app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const searchedId =  Number(id)
  personExistsInDataBase = persons.find(person => person.id == searchedId)

  //frontend treats 404 as an error,
  //so we get the notification "person has was already removed from the database" correctly
  if(!personExistsInDataBase){
    response.status(404).end()
  }


  persons = persons.filter(person => person.id !== searchedId)
  response.status(204).end()
}) 




app.get('/info/', (request, response) => {
  const amount = persons.length
  const phoneBookResponse = `<p>phonebook has info for ${amount} people</p>`
  const timeResponse = `<p>${new Date()}</p>`


  response.send(`${phoneBookResponse}${timeResponse}`)
}) 

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

