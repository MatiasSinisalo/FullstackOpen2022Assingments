import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { modifyiSingleBlog, sortAllBlogs, removeBlogFromStore } from "../reducers/blogReducer";
import { useEffect, useState } from "react";



const Blogs = ({filterByUserID}) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state=>state.user)

  const handleRemoval = async (blog) => {
    const confirmRemoval = window.confirm(
      `remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirmRemoval === true) {
      await blogService.remove(blog);
      dispatch(removeBlogFromStore(blog));
      dispatch(sortAllBlogs());
    }
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
