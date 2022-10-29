import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
 
    const dispatch = useDispatch()
  
    const createNewAnecdote = (event) => {
        event.preventDefault()

        dispatch(createAnecdote(event.target.anecdote.value))
    
        dispatch(setNotification(`you created ${event.target.anecdote.value}`))
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