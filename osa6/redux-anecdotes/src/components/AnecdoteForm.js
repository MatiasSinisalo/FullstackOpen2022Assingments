import { useDispatch} from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
 
    const dispatch = useDispatch()
  
    const createNewAnecdote = (event) => {
      event.preventDefault()
      dispatch(createAnecdote(event.target.anecdote.value))
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