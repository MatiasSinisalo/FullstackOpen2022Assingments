import { useState, useRef } from "react";
import Togglable from "./Togglable";
import PropTypes from "prop-types";
const CreateBlogs = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const creationFormToggleRef = useRef();

  const handleBlogCreation = async (event) => {
    event.preventDefault();

    await createBlog({ title: title, author: author, url: url });
    creationFormToggleRef.current.toggleVisibility();
  };

  return (
    <>
      <Togglable buttonLabel="add new blog" ref={creationFormToggleRef}>
        <h2>create new</h2>
        <form onSubmit={handleBlogCreation}>
          title
          <input
            id="createBlogTitle"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
          <br></br>
          author
          <input
            id="createBlogAuthor"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
          <br></br>
          url
          <input
            id="createBlogUrl"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
          <br></br>
          <input type="submit" value="create blog"></input>
        </form>
      </Togglable>
    </>
  );
};

CreateBlogs.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateBlogs;
