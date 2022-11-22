import { useEffect, useState } from 'react'
import { LOGIN} from './GraphQLqueries/userQueries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LogInForm'
import {useMutation} from '@apollo/client'
import FavoriteGenres from './components/FavoriteGenres'


const App = (props) => {
  const [page, setPage] = useState('authors')
  const [loggedIn, setLoggedIn] = useState(false)
  const [login, result] = useMutation(LOGIN)
  useEffect(() => {
    if(result.data){
      localStorage.setItem('libaryUserToken', result.data.login.value)
      setLoggedIn(true)
    }
  }, [result.data])

  useEffect(() => {
    if(props.token){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  }, [props.token])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try{
     await login({variables: {username, password}})
    }
    catch{
      //TODO: notification for failing login
      console.log("login failed")
    }
  }

  const handleLogout = async(event) => {
      localStorage.removeItem('libaryUserToken')
      setLoggedIn(false) 
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

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page==="login"} handleLogin={handleLogin}/>

      <FavoriteGenres show={page==='favouriteGenres'}/>

    </div>
  )
}

export default App
