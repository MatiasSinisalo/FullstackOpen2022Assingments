import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleLike, handleRemoval } from "../reducers/blogReducer";
import { useEffect } from "react";

const BlogFullView = () => {
  const blogId = useParams().id
  
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find((blog) => {return blog.id === blogId})
  const user = useSelector(state => state.user)


  const dispatch = useDispatch()
  const navigate = useNavigate()


    useEffect(() => {
        console.log("Single blog view updated")
    }, [])
    
  const increaseLikes = () => {
    dispatch(handleLike(blog))
  }

  const removeBlog = () => {
    dispatch(handleRemoval(blog))
    navigate("/")
  }
  return(
   
    <div>
    {
        blog !== undefined ?
            <>
                <h3>
                {blog.title}
                </h3>

            <p>{blog.url}</p>

            <p>
                likes {blog.likes} <button onClick={increaseLikes}>like</button>{" "}
            </p>

            <p>
                <b>{blog.author}</b>
            </p>

            {blog.user.username === user.username ? (
                <button onClick={removeBlog}>remove</button>
            ) : (
                <></>
            )}
        </>
    :
    <></>
    }
    
    </div>
    )
};

export default BlogFullView