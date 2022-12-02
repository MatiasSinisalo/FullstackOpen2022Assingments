import { useEffect, useState } from 'react'
import { LOGIN, ME} from './GraphQLqueries/userQueries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LogInForm'
import Notification from './components/Notification'
import {useMutation, useApolloClient, useQuery, useSubscription} from '@apollo/client'
import FavoriteGenres from './components/FavoriteGenres'
import { BOOK_ADDED } from './GraphQLqueries/bookQueries'


const App = (props) => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('libaryUserToken'))
  const [login, result] = useMutation(LOGIN)

  const [notification, setNotification] = useState({msgStyle: "success", msg: null, show: false, id: null})
 
  useEffect(() => {
  async function updateState(){
    if(token){
      setLoggedIn(true)
      const userQuery = await client.query({query: ME})
      setCurrentUser(userQuery.data.me)
    }
    else{
      setLoggedIn(false)
    }
  }
  updateState()
  }, [token])
  
  useEffect(() => {
    if(result.data){
      localStorage.setItem('libaryUserToken', result.data.login.value)
      setLoggedIn(true)
      setToken(result.data.login.value)
    }
  }, [result.data])

  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
        console.log(data.data.bookAdded)
        notifyi("green", `new book with title: ${data.data.bookAdded.title} was added to booklist`)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try{
      await login({variables: {username, password}})
    }
    catch{
      console.log("login failed")
    }
  }

  const handleLogout = async(event) => {
      localStorage.removeItem('libaryUserToken')
      setLoggedIn(false)
      client.resetStore()
      setPage('authors')
  }


  const notifyi = (style, content) => {
    const notificationId = setTimeout(() => {
      clearInterval(notification.id)
      setNotification({msgStyle: style, msg: "", show: false, id: null})
    }, 5000)
    setNotification({msgStyle: style, msg: content, show: true, id: notificationId})
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loggedIn ? <button onClick={() => setPage('add')}>add book</button> : <></>}
        {loggedIn ? <button onClick={() => setPage('favouriteGenres')}>recommended</button> : <></>}
        {!loggedIn ? <button onClick={() => setPage('login')}>log in</button> : <button onClick={handleLogout}>log out</button>}
        
      </div>
      <Notification msgStyle={notification.msgStyle} msg={notification.msg} show={notification.show}/>
      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page==="login"} handleLogin={handleLogin}/>

      <FavoriteGenres show={page==='favouriteGenres'} user={currentUser}/>

    </div>
  )
}

export default App
