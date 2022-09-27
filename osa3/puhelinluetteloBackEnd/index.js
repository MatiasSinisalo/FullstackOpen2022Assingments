const http = require('http')

const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

app.use(morgan('tiny'))


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

app.post('/api/persons/', (request, response) => {
 



  let errorMessage = ''
  
  if(!request.body.name){
    errorMessage =errorMessage + 'name missing'
   
  }
  const personWithSameName = persons.find(person => person.name === request.body.name)

  if(personWithSameName){
    errorMessage = errorMessage + ' name must be unique'
  }


  if(!request.body.number){
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
    name: request.body.name,
    number: request.body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
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


app.delete('/api/persons/:id', (request, response) => {
  const searchedId =  Number(request.params.id)
  persons = persons.filter(person => person.id !== searchedId)
  response.status(204).end()
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