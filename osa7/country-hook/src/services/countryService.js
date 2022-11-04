import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/name'


const getByName = async (countryName) => {
    const response = await axios.get(`${baseUrl}/${countryName}?fullText=true`)
    return response.data
}




export default { getByName }