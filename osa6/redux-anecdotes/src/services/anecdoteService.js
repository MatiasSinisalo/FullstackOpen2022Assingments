import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const modifyi = async (modifiedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${modifiedAnecdote.id}`, modifiedAnecdote)
  return response.data
}


export default { getAll, get, create, modifyi }