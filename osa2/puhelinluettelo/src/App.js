import { useEffect, useState } from 'react'
import personService from './services/persons'

const Person = ({person, deleteFunction}) =>{
  return (
    <>
      <p>{person.name} {person.number} <button value = {person.id} onClick={deleteFunction}>delete</button></p>
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


const Persons = ({persons, filter, deleteFunction}) =>{
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   return (
    <>
      {filteredPersons.map(person => <Person key={person.id} person={person} deleteFunction={deleteFunction}/>)}
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
      const response = personService.create(newPerson)
      response.then(justAddedPerson => setPersons(persons.concat(justAddedPerson)))
    }
    else
    {
      const shouldReplaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)   
      if(shouldReplaceNumber){
      
        const personToModify = persons.find(person => person.name === newName)
        const changedPerson = {...personToModify, number : newPhoneNumber}
       
        const response = personService.modifyi(changedPerson.id, changedPerson)
        response.then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })
      }

    }
  }

  const deletePerson = (event) =>{
    const personToDelete = persons.find(person => person.id == event.target.value)
    const shouldDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if(shouldDelete)
    {
      personService.destroy(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
    
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
      <Persons persons={persons} filter={filter} deleteFunction={deletePerson}/>
    </div>
  )

}

export default App