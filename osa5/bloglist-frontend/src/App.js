import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
  return (
    <div>
      <h1>Log in to application</h1>
    <form onSubmit={handleLogin}>
      username<input onChange={({target})=>setUsername(target.value)} type="text" value={username}></input>
      <br></br>
      password<input onChange={({target})=>setPassword(target.value)} type="password" value={password}></input>
      <br></br>
      <input type="submit" value="login"></input>
    </form>
  </div>
  )
}

const LoggedInView = ({user, blogs}) => {
  return(
    <>
    <h2>{user.name} logged in</h2>
    <Blogs blogs={blogs}/>
    
    </>
  )
}


const Blogs = ({blogs}) => {
  return(
    <>
    <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


 
  const handleLogin = async (event)=>{
      event.preventDefault()
    //  console.log(username)
    //  console.log(password)
      const loginInfo = await loginService.login({username, password})
   //   console.log(loginInfo)
      if(loginInfo.token){
        setUser(loginInfo)
      }
    }
  
   
 
  return (
    <>   

      {
        user === null ?
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
        :
        <LoggedInView user={user} blogs={blogs}/>
      }
    
   
     
     
    
    </>
  )
}

export default App
