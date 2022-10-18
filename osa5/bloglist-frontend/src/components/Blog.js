import { useState } from "react"




const Blog = ({blog}) => {
  const [fullViewVisible, setFullViewVisible] = useState(false)

  const toggleFullView = () => {
    setFullViewVisible(!fullViewVisible)
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
    
      <p>likes {blog.likes}</p>
     
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