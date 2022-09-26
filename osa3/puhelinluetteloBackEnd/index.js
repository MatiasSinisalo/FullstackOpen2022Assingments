const http = require('http')

const express = require('express')
const app = express()

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
  response.json(persons)
}) 

app.get('/api/persons/:id', (request, response) => {
  const searchedId =  Number(request.params.id)
  const requestedPerson = persons.find(person => person.id === searchedId)
  if(requestedPerson){
    response.json(requestedPerson)
  }
  else{
    response.status(404).end()
  }
}) 
    







app.get('/info/', (request, response) => {
  const amount = persons.length
  const phoneBookResponse = `<p>phonebook has info for ${amount} people</p>`
  const timeResponse = `<p>${new Date()}</p>`


  response.send(`${phoneBookResponse}${timeResponse}`)
}) 

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)