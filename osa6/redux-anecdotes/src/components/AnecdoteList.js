import { useSelector, useDispatch, useStore } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
   
    dispatch(setNotification(`you liked ${anecdote}`))
    setTimeout(() => {
        dispatch(setNotification(``))
    }, 5000);
  }

  return (
    <div>
      <Filter/>
        {anecdotes.filter(anecdote =>anecdote.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote => 
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList