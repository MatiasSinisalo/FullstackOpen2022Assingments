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
    <div className="blogCreationSection">
      <Togglable buttonLabel="add new blog" ref={creationFormToggleRef}>
        <h2>create new</h2>
       
        <form onSubmit={handleBlogCreation}>
        <table>
          <tbody>
            <tr>
              <td>
                title
            </td>
            <td>
              <input
                id="createBlogTitle"
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              ></input>
            </td>
          </tr>
          <tr>
          <td>
            author
          </td>
          <td>
            <input
              id="createBlogAuthor"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </td>
          </tr>
          <tr>
            <td>
              url
            </td>
            <td>
              <input
                id="createBlogUrl"
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              ></input>
            </td>
          </tr>
          <br></br>
          <button type="submit" value="create blog">Create Blog</button>
          </tbody>
          </table>
          
        </form>
        
      </Togglable>
    </div>
  );
};

CreateBlogs.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateBlogs;
