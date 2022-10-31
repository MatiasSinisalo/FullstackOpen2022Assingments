import { useDispatch } from 'react-redux'
import { createAndSaveAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
 
    const dispatch = useDispatch()
  
    const createNewAnecdote = async (event) => {
        event.preventDefault()

        const newAnecdote = {
          content: event.target.anecdote.value,
          votes: 0
        }

      
        dispatch(createAndSaveAnecdote(newAnecdote))
    
        dispatch(setNotification(`you created ${newAnecdote.content}`))
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