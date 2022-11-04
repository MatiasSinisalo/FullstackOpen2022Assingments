import { useState, useEffect } from 'react'
import countryService from './services/countryService'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

 
  useEffect(() => {
    async function updateCountry() {
      const newCountry = await countryService.getByName(name)
      setCountry(newCountry[0])  
      return country
    }
    updateCountry()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
