import CreateBlogs from "./CreateBlogs";
import Blogs from "./Blogs";
import PropTypes from "prop-types";

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Users from "../components/Users";
import User from "./User";
import BlogFullView from "./BlogFullView";
import { useEffect } from "react";


const LoggedInView = ({
  blogs,
  user,
  logOut,
  createBlog,
}) => {
  useEffect(() => {
    console.log("logged in view updated!")

  }, [])
  return (
    <>
   
     
        <h2>{user.name} logged in</h2>
        <input id="logout" type="submit" onClick={logOut} value="logout"></input>
        <p></p>


        <Routes>
        <Route path="/users/:id" element={<User/>}></Route>
        
        <Route path="/users/" element={
          <Users/>
        }></Route>
      
        <Route path="/blogs/:id" element={<BlogFullView/>}></Route>
      
        <Route path="/" element={
          <>
            <CreateBlogs blogs={blogs} createBlog={createBlog} />
            <Blogs
            blogs={blogs}
            user={user}
          />
        </>
        }></Route>
    </Routes>
    </>
  );
};

LoggedInView.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
};

export default LoggedInView;
