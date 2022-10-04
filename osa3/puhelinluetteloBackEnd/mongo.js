const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}



const addPerson = (name, password) => {
  const personsSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personsSchema)

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

const getPersons = () => {
  const personsSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personsSchema)

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

}


const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url = process.env.MONGODB_URI
mongoose.connect(url)


if(name && number){
  addPerson(name, number)
}
else{
  getPersons()
}




