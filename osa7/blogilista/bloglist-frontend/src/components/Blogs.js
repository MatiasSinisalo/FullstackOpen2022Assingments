import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { modifyiSingleBlog, sortAllBlogs, removeBlogFromStore } from "../reducers/blogReducer";
import { useEffect, useState } from "react";
import { handleRemoval } from "../reducers/blogReducer";


const Blogs = ({blogs, user}) => {
  return (
    <>
      <h2>blogs</h2>
      {
       
        
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
