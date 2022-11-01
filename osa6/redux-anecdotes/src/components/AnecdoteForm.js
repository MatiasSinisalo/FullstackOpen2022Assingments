//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAndSaveAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
 
    
    const createNewAnecdote = async (event) => {
        event.preventDefault()

        const newAnecdote = {
          content: event.target.anecdote.value,
          votes: 0
        }

      
        props.createAndSaveAnecdote(newAnecdote)
    
        props.setNotification(`you created ${newAnecdote.content}`, 5)
        
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


const mapStateToProps = () => {
  return {}
}


const mapDispatchToProps = {
  setNotification, createAndSaveAnecdote
}

const connectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm