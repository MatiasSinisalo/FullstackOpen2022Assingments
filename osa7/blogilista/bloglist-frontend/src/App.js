import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedInView from "./components/loggedInView";
import blogsService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationMessage } from "./reducers/notificationReducer";
import CreateBlogs from "./components/CreateBlogs";
import User from "./components/User";
import Users from "./components/Users";
import BlogFullView from "./components/BlogFullView";
import Blogs from "./components/Blogs";
import {
  addBlog,
  modifyiSingleBlog,
  setAllBlogs,
  sortAllBlogs,
  removeBlogFromStore,
} from "./reducers/blogReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from "react-router-dom"

import { setUser } from "./reducers/userReducer";


const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState(null);
  
  //const [notification, setNotification] = useState({ style: "", message: "" });
  const dispatch = useDispatch();
  const reduxNotification = useSelector((state) => state.notification);
  const reduxBlogs = useSelector((state) => state.blogs);
  const reduxUser = useSelector((state) => state.user);
  const navigate = useNavigate()
  const setBlogs = (blogs) => {
    
    dispatch(setAllBlogs(blogs));
    dispatch(sortAllBlogs());
  };

  const setNotification = (notification) => {
    dispatch(setNotificationMessage(notification));
  };

  useEffect(() => {
    //console.log("app updated!")
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);




  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    // console.log(userJSON)
    if (userJSON) {
      const user = JSON.parse(userJSON);
      if (user) {
        dispatch(setUser(user));
        blogService.setToken(user.token);
      }
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginInfo = await loginService
      .login({ username, password })
      .catch(() => {
        setNotification({
          style: "error",
          message: "wrong username or password",
        });
        setTimeout(() => {
          setNotification({ style: "", message: "" });
        }, 5000);
      });

    if (loginInfo) {
      dispatch(setUser(loginInfo));
      blogService.setToken(loginInfo.token);
      window.localStorage.setItem("user", JSON.stringify(loginInfo));
     
      navigate("/")
      setNotification({
        style: "success",
        message: `logged in as ${loginInfo.name} `,
      });
      setTimeout(() => {
        setNotification({ style: "", message: "" });
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(setUser(null));
    window.localStorage.setItem("user", null);
    setPassword("");
    setUsername("");
    setNotification({ style: "success", message: "logged out" });
    setTimeout(() => {
      setNotification({ style: "", message: "" });
    }, 5000);
  };

 
  const createBlog = async (blog) => {
    const response = await blogService.create(blog).catch((error) => {
      setNotification({ style: "error", message: error.message });
      setTimeout(() => {
        setNotification({ style: "", message: "" });
      }, 5000);
    });

    if (response.blog) {
      dispatch(addBlog({ ...response.blog, user: response.user }));
      dispatch(sortAllBlogs());

      setNotification({
        style: "success",
        message: `Created a blog: ${response.blog.title} with author: ${response.blog.author}`,
      });
      setTimeout(() => {
        setNotification({ style: "", message: "" });
      }, 5000);
    }
  };

  return (
    <>
     
        
        <Notification notification={reduxNotification.notification} />
        {reduxUser === null ? (
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        ) : (
          <>
              <LoggedInView
              user={reduxUser}
              blogs={reduxBlogs}
              logOut={handleLogout}
              createBlog={createBlog}
              />

       
          </>
        )}
       
      
    </>
  );
};

export default App;
