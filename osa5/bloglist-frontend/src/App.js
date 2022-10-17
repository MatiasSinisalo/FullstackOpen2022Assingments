import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({notification}) =>{

  return (
    <div className={notification.style}>
      {notification.message}
    </div>
  )
}


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

const LoggedInView = ({user, blogs, logOut, handleBlogCreation, title, setTitle, author, setAuthor, url, setUrl}) => {
  return(
    <>
    <h2>{user.name} logged in</h2>
    <input type="submit" onClick={logOut} value="logout"></input>
    <CreateBlogs  handleBlogCreation={handleBlogCreation} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
    <Blogs blogs={blogs}/>
    
    </>
  )
}

const CreateBlogs = ({handleBlogCreation, title, setTitle, author, setAuthor, url, setUrl}) => {
  
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
      title<input type="text" value={title} onChange={({target}) => setTitle(target.value)}></input>
      <br></br>
      author<input type="text" value={author} onChange={({target}) => setAuthor(target.value)}></input>
      <br></br>
      url<input type="text" value={url} onChange={({target}) => setUrl(target.value)}></input>
      <br></br>
      <input type="submit" value="create blog"></input>

      </form>
    
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

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState({style: "", message: ""})

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    
    const response = await blogService.create({title: title, author: author, url: url}).catch(error => {
      setNotification({style: "error", message: error.message})
      setTimeout(() => {
        setNotification({style: '', message: ''})
      }, 5000);

    })
    
    if(response.blog){
      setNotification({style: "success", message: `Created a blog: ${response.blog.title} with author: ${response.blog.author}`})
      setTimeout(() => {
        setNotification({style: '', message: ''})
      }, 5000);
    }
   
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs) 
    
   
  }
  
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
    //  console.log(username)
    //  console.log(password)
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
    //  setUsername("")
    //  setPassword("")
     // console.log(loginInfo)
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
        <LoggedInView user={user} blogs={blogs} logOut={handleLogout} handleBlogCreation={handleBlogCreation} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
      }
    
   
     
     
    
    </>
  )
}

export default App
