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

const anecdoteReducer = createSlice( {
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
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



export const createAndSaveAnecdote = (anecdote) => {
  return async dispatch => {
      const savedAnecdote = await anecdoteService.create(anecdote)
      dispatch(createAnecdote(savedAnecdote))
  }
}


export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.get(id)
    const updatedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
    const response = await anecdoteService.modifyi(updatedAnecdote)
    dispatch(vote(id))
  }
}



export const { vote, createAnecdote, setAnecdotes } = anecdoteReducer.actions

export default anecdoteReducer.reducer