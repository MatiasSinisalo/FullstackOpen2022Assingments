import CreateBlogs from "./CreateBlogs";
import Blogs from "./Blogs";
import PropTypes from "prop-types";

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Users from "../components/Users";




const LoggedInView = ({
  blogs,
  user,
  logOut,
  createBlog,
  handleLike,
  handleRemoval,
}) => {
  return (
    <>
    <Router>
     
        <h2>{user.name} logged in</h2>
        <input id="logout" type="submit" onClick={logOut} value="logout"></input>
        <p></p>

       

       
      <Routes>
        
        <Route path="" element={
          <>
            <CreateBlogs blogs={blogs} createBlog={createBlog} />
            <Blogs
            blogs={blogs}
            handleLike={handleLike}
            handleRemoval={handleRemoval}
            user={user}
          />
         </>
        }></Route>

        <Route path="/users/" element={
           <Users/>
        }></Route>
      
      
      </Routes>
      </Router>
    </>
  );
};

LoggedInView.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default LoggedInView;
