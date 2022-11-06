import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleLike, handleRemoval } from "../reducers/blogReducer";
import { useEffect } from "react";
import Comments from "./Comments";
const BlogFullView = () => {
  const blogId = useParams().id
  
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find((blog) => {return blog.id === blogId})
  const user = useSelector(state => state.user)


  const dispatch = useDispatch()
  const navigate = useNavigate()
   
  const increaseLikes = () => {
    dispatch(handleLike(blog))
  }



  const removeBlog = () => {
    dispatch(handleRemoval(blog))
    navigate("/")
  }
  return(
   
    <div className="blogFullView">
    {
        blog !== undefined ?
            <>
            <div className="fullBlogContent">
                    <h1>
                    {blog.title}
                    </h1>

                <div className="blogLikes">
                <p>
                    likes {blog.likes} <button className="likeButton" onClick={increaseLikes}>like</button>{" "}
                </p>
                </div>
                <p className="blogUrl">
                    <a href={blog.url}>{blog.url}</a>
                </p>

                <div className="blogAuthorShowCase">
                    <h2>Author: {blog.author}</h2>
                </div>

                {blog.user.username === user.username ? (
                    <button className="removeBlogButton" onClick={removeBlog}>remove</button>
                ) 
                : (
                    <></>
                )}
            </div>
          
            <Comments blogComments = {blog.comments} id = {blog.id}></Comments>
            
        </>
    :
    <></>
    }
    
    </div>
    )
};

export default BlogFullView