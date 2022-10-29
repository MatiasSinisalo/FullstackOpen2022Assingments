import { useSelector, useDispatch} from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
    
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const createNewAnecdote = (event) => {
    event.preventDefault()
    console.log('create: ', event.target.anecdote.value)
    dispatch(createAnecdote(event.target.anecdote.value))
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={createNewAnecdote}>
        anecdote<input name="anecdote" type="text"></input>
        <button type="submit">create</button>
      </form>


      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App