import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from "./services/anecdoteService"

const store = configureStore({reducer: {anecdotes: anecdoteReducer, notification: notificationReducer, filter: filterReducer}})


export default store