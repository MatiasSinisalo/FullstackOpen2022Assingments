import { useEffect, useState } from 'react'
import personService from './services/persons'

const Person = ({person}) =>{
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

const FilterInput = ({variable, updateFunction}) =>{
  return(
  <>
    <div>
        filter shown with <input value = {variable} onChange={updateFunction}></input>
    </div>
  </>
  )
}


const Form = ({formVariables, addPerson}) =>{
  return(
    <>
          <form onSubmit={addPerson}>
          <div>
            name: <input value = {formVariables[1].variable} onChange={formVariables[1].updateFunction}/>
          </div>
          <div>
           number: <input value = {formVariables[2].variable} onChange={formVariables[2].updateFunction}></input>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      
    </>
    
  )
}


const Persons = ({persons, filter}) =>{
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   return (
    <>
      {filteredPersons.map(person => <Person key={person.name} person={person}/>)}
    </>
  )
}


const App = () => {

 

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    
    if(newName === ''){
      alert("Emty name is not allowed")
    }
    else if(!persons.some(person => person.name === newName))
    {
      const newPerson = {name: newName, number: newPhoneNumber}
      personService.create(newPerson)
      setPersons(persons.concat(newPerson))
    }
    else
    {
      alert(`${newName} is already added to phonebook`)   
    }
  }

  const handleNameChange = (event) =>{
    
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) =>{
   
    setPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    
    setFilter(event.target.value)
  }

 
  const formVariables = [
    {
      variable: filter,
      updateFunction: handleFilterChange,
    },
    {
      variable: newName,
      updateFunction: handleNameChange,
    },
    {
      variable: newPhoneNumber,
      updateFunction: handlePhoneNumberChange,
    },
  ]
 
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput variable = {formVariables[0].variable} updateFunction = {formVariables[0].updateFunction} />
      <h3>Add a new</h3>
      <Form formVariables = {formVariables} addPerson = {addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App