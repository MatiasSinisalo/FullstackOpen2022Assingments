import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { createAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from "./services/anecdoteService"

const store = configureStore({reducer: {anecdotes: anecdoteReducer, notification: notificationReducer, filter: filterReducer}})
anecdoteService.getAll().then(
    anecdotes => {
        anecdotes.forEach(anecdote => {
            store.dispatch(createAnecdote(anecdote))
        });
    }
)


export default store