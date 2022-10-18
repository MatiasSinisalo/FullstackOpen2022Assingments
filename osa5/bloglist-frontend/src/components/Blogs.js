import Blog from "./Blog"
const Blogs = ({blogs, handleLike}) => {
    return(
      <>
      <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
        )}
      </>
    )
  }

export default Blogs