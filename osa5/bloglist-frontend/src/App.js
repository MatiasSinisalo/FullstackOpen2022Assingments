import axios from 'axios'
import { useState, useEffect} from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInView from './components/loggedInView'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  const [notification, setNotification] = useState({style: "", message: ""})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
   // console.log(userJSON)
    if(userJSON){
     const user = JSON.parse(userJSON)
     if(user){
      setUser(user) 
      blogService.setToken(user.token)
     }
    }
  }, [])

  const handleLogin = async (event)=>{
      event.preventDefault()
 
      const loginInfo = await loginService.login({username, password}).catch(error => {
        setNotification({style: "error", message: `wrong username or password`})
        setTimeout(() => {
        setNotification({style: '', message: ''})
      }, 5000);
      })
      
      if(loginInfo){
        setUser(loginInfo)
        blogService.setToken(loginInfo.token)
        window.localStorage.setItem('user', JSON.stringify(loginInfo))

        setNotification({style: "success", message: `logged in as ${loginInfo.name} `})
        setTimeout(() => {
        setNotification({style: '', message: ''})
      }, 5000);
      }
   
    }
  
    const handleLogout = (event) => {
      event.preventDefault()
      setUser(null)
      window.localStorage.setItem('user', null)
      setPassword("")
      setUsername("")
      setNotification({style: "success", message: `logged out`})
        setTimeout(() => {
        setNotification({style: '', message: ''})
      }, 5000);
    }
   
 
  return (
    <>   
      <Notification notification={notification}/>
      {
        user === null ?
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
        :
        <LoggedInView user={user} blogs={blogs} logOut={handleLogout} setBlogs={setBlogs} setNotification={setNotification}/>
      }
    </>
  )
}

export default App
