import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import  anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
 
    const dispatch = useDispatch()
  
    const createNewAnecdote = async (event) => {
        event.preventDefault()

        const newAnecdote = {
          content: event.target.anecdote.value,
          votes: 0
        }

        const response = await anecdoteService.create(newAnecdote)
        dispatch(createAnecdote(newAnecdote))
    
        dispatch(setNotification(`you created ${newAnecdote}`))
        setTimeout(() => {
            dispatch(setNotification(``))
        }, 5000);
    }
  
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={createNewAnecdote}>
          anecdote<input name="anecdote" type="text"></input>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

export default AnecdoteForm