import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdotesAtStart = []


const initialState = anecdotesAtStart.map(asObject)


/*
export const createAnecdote = (newAnecdote) => {
  return{
    type: 'create', data: {anecdote: newAnecdote}
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'vote', data: {id: id}
  }
}
*/

/*
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type){
    case 'vote':
      const updatedAnecdotes = state.map(anecdote => anecdote.id === action.data.id ? {...anecdote, votes : anecdote.votes + 1} : anecdote)
      .sort((a, b) => {return b.votes - a.votes})
      console.log(updatedAnecdotes)
      state = updatedAnecdotes

      return state
    case 'create':
      return state.concat(asObject(action.data.anecdote))
    default:
      return state
  }
}
*/

const anecdoteReducer = createSlice( {
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      console.log(action)
      const updatedAnecdotes = state.map(anecdote => anecdote.id === action.payload ? {...anecdote, votes : anecdote.votes + 1} : anecdote)
      .sort((a, b) => {return b.votes - a.votes})
      console.log(updatedAnecdotes)
      state = updatedAnecdotes
      return state
    },
    createAnecdote(state, action){
      console.log(action)
      return state.concat(action.payload)
    },
    setAnecdotes(state, action){
      
      return action.payload
    },
    
  }
}

)

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}


export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteReducer.actions

export default anecdoteReducer.reducer