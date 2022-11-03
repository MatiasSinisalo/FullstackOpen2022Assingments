import { useState, useRef, useImperativeHandle, forwardRef  } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from "react-router-dom"
import useField from './hooks'


const Notification = forwardRef((props, ref) => {
  const [notification, setNotification] = useState({message: '', timeoutID: undefined})

  const newNotification = (newMessage, timeoutSeconds) => {
    
    clearTimeout(notification.timeoutID)
    const newTimeOut = setTimeout(() => {
        setNotification({message: '', timeoutID: undefined})
    }, timeoutSeconds * 1000)
 
    const newNotification = {message: newMessage, timeoutID: newTimeOut} 
    setNotification(newNotification)
 
  } 

  useImperativeHandle(ref, () => {
    return {
      newNotification
    }
  })

  return(
    <div>
      <p>{notification.message}</p>
    </div>
  )
} )



const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to = "/">anecdotes</Link>
      <Link style={padding} to = "/create">create new</Link>
      <Link style={padding} to = "/about">about</Link>
     
    </div>
  )
}

const AnecdoteInfo = (props) => {
  const id = useMatch(`/anecdotes/:id`).params.id

  const anecdote = props.anecdotes.find(anecdote => anecdote.id == id)
  return(
    <div>
    <h1>{anecdote.content} by {anecdote.author}</h1>
    <p>has {anecdote.votes} votes</p>
    <p>for more info: <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
   
      {anecdotes.map(anecdote => <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}><li key={anecdote.id} >{anecdote.content}</li></Link>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
 // const [content, setContent] = useState('')
 //  const [author, setAuthor] = useState('')
 // const [info, setInfo] = useState('')

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
     content: content.value,
     author: author.value,
     info: info.value,
     votes: 0
    })
    props.createNotification(`a new anecdote ${content.value} created !`, 5)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const notificationRef = useRef()

  const createNotification = (message, timeoutSeconds) => {
    console.log(message)
    notificationRef.current.newNotification(message, timeoutSeconds)

  }


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>

      <Router>
      <Notification ref={notificationRef}/>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/> 
        <Route path="/create" element={<CreateNew addNew={addNew} createNotification={createNotification}/>}/>
        <Route path="/about" element={ <About />}/>
        <Route path="/anecdotes/:id" element= {<AnecdoteInfo anecdotes={anecdotes}></AnecdoteInfo>}/>
      </Routes>
      <Footer />
      
      </Router>
    </div>
   
  )
}

export default App
