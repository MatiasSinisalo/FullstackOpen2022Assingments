import axios from 'axios'
const baseUrl = "https://restcountries.com/v3.1/all"

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(respose => respose.data)
}

export default {getAll}

