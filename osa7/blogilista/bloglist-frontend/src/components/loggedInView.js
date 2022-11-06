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
 
  return (
    <>
        <div className="navbar">
        <Link to="/"><p>blogs</p></Link>
        <Link to="/users"><p>users</p></Link>

        <div className="userinfo">
          <p> <b>{user.name}</b> logged in</p>
          <button className="logoutbutton" id="logout" type="submit" onClick={logOut} value="logout">log out</button>
        </div>
      
        </div>
     


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
