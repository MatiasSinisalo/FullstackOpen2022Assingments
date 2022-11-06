import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Blog = ({ blog, handleLike, handleRemoval, user }) => {
  const increaseLikes = async () => {
    await handleLike(blog);
  };

  const removeBlog = async () => {
    await handleRemoval(blog);
  };
 
  return (
    <Link to={`/blogs/${blog.id}`}>
    <div className="blog">
      <div>
      <h3>
        <h3>{blog.title}</h3> <p className="blogAuthorHighlight"> by {blog.author}</p>
        
      </h3>
    </div>
    </div>
    </Link>
  );
};

export default Blog;
