import { useState } from "react"
import blogsService from '../services/blogs'



const Blog = ({blog}) => {
  const [fullViewVisible, setFullViewVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const toggleFullView = () => {
    setFullViewVisible(!fullViewVisible)
  }
  const increaseLikes = () => {
    const newLikes = likes + 1
    blog.likes = newLikes
    setLikes(newLikes)
  }

  const handleLike = async () => {
    const modifiedBlogData = {
      likes: likes + 1,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id
    }
    const response = await blogsService.modifyi(modifiedBlogData)
    increaseLikes()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const preView = () => (
    <div>
    <h3>{blog.title} {blog.author} <button onClick={toggleFullView}>view</button></h3>
    </div>
  )

  const fullView = () => (
    <div>
      <h3>{blog.title} <button onClick={toggleFullView}>hide</button></h3> 
     
      <p>{blog.url}</p>
    
      <p>likes {likes} <button onClick={handleLike}>like</button> </p>
     
      <p><b>{blog.author}</b></p>

    </div>
  )
  return(
    <div style={blogStyle}>
      {
      !fullViewVisible ?
      preView()
      :
      fullView()
      }
    </div>  
  )
}

export default Blog