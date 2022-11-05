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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
      <h3>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}{" "}</Link>
        
      </h3>
    </div>
    </div>
  );
};

export default Blog;
