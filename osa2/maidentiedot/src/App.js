import { useEffect, useState } from 'react'
import countriesService from './services/Countries.js'


const FilterInput = ({variable, updateFunction}) =>{
  return(
  <>
    <div>
        filter shown with <input value = {variable} onChange={updateFunction}></input>
    </div>
  </>
  )
}


const Country = ({country}) => {
  const languages = Object.values(country.languages)
 // console.log({languages})
 console.log(country)
  return(
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={country.flags.png}></img>
    </>
  )
}

const Countries = ({countries, filter}) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  //console.log(filteredCountries)
  if(filteredCountries.length == 1)
  {
  return (
    <>
    {filteredCountries.map(country => <Country key={country.name.official} country={country}/>)}
    </>
  )
  }
  else{
    return(
      <>
        <p>Too many matches, specifyi another filter</p>
      </>
    )
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) =>{
    
    setFilter(event.target.value)
  }
  useEffect(() => {
    countriesService.getAll()
    .then(newCountries => setCountries(newCountries))
  }, []) 
 
  return (
   <>
   <FilterInput variable={filter} updateFunction={handleFilterChange}/>
   <h1>Countries matching search</h1>
   <Countries countries={countries} filter={filter}/>
   </> 
  )
}
// <Countries countries={countries} filter={filter}/>
export default App;
