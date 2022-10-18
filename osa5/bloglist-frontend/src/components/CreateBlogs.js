import { useState, useEffect, forwardRef, useRef, useImperativeHandle} from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const CreateBlogs = ({blogs, setBlogs, setNotification}) => {
   
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const creationFormToggleRef = useRef()
  
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
  
      creationFormToggleRef.current.toggleVisibility()
     
    }
  
    return(
      <>
      <Togglable buttonLabel="add new blog" ref={creationFormToggleRef}>
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
      </Togglable>
      </>
    )
  
  }
export default CreateBlogs