import CreateBlogs from './CreateBlogs'
import Blogs from './Blogs'

const LoggedInView = (props) => {
  return(
    <>
      <h2>{props.user.name} logged in</h2>
      <input id="logout" type="submit" onClick={props.logOut} value="logout"></input>
      <p></p>

      <CreateBlogs blogs={props.blogs} createBlog={props.createBlog}/>

      <Blogs blogs={props.blogs} handleLike = {props.handleLike} handleRemoval={props.handleRemoval}  user={props.user}/>

    </>
  )
}

export default LoggedInView