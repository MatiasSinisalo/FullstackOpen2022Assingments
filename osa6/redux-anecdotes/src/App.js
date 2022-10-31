
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])



  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      
      <AnecdoteList/>

      <AnecdoteForm/>
    </div>
  )
}

export default App