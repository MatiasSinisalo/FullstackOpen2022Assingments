import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { modifyiSingleBlog, sortAllBlogs, removeBlogFromStore } from "../reducers/blogReducer";
import { useEffect, useState } from "react";
import { handleRemoval } from "../reducers/blogReducer";


const Blogs = ({filterByUserID}) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state=>state.user)

  const removeBlog = async (blog) => {
    dispatch(removeBlog(blog))
  };


  return (
    <>
      <h2>blogs</h2>
      {
        filterByUserID !== undefined ?
        blogs.filter(blog => {return blog.user.id === filterByUserID}).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleRemoval={handleRemoval}
            user={user}
          />
        ))
        :
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleRemoval={handleRemoval}
            user={user}
          />
        ))
        
      }
    </>
  );
};

export default Blogs;
