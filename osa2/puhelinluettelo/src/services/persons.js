import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'




const getAll = () => {
   const response = axios.get(baseUrl)
   return response.then(response => response.data)
}
  
const create = (newPerson) => {
    const response = axios.post(baseUrl, newPerson)
    return response.then(response => response.data)
}


const modifyi = (id, newObject) => {
    const response = axios.put(`${baseUrl}/${id}`, newObject)
    return response.then(response => response.data)
}



const destroy = (id) =>{
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then(response => response.data)
}

export default {getAll, create, modifyi, destroy}