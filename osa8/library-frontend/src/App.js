import { useEffect, useState } from 'react'
import { LOGIN } from './GraphQLqueries/userQueries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LogInForm'
import { useMutation } from '@apollo/client'
const App = () => {
  const [page, setPage] = useState('authors')
  const [login, result] = useMutation(LOGIN)
  const [token, setToken] = useState(null)
  useEffect(() => {
    if(result.data){
      setToken(result.data.login.value)
      console.log(result.data.login.value)
    }
  }, [result.data])


  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    login({variables: {username, password}})
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>log in</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page==="login"} handleLogin={handleLogin}/>
    </div>
  )
}

export default App
