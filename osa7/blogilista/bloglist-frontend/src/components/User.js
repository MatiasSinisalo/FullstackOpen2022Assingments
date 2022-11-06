import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Blogs from "../components/Blogs"
import usersService from "../services/users"
const User = () => {


    const [user, setUser] = useState({id: undefined, name: undefined, blogs: []})
    const userId = useParams().id
    const blogs = useSelector(state => state.blogs)
    const userBlogs = blogs.filter((blog) => blog.user.id === userId)
    useEffect(() => {
        async function fetchUser(){
            const thisPagesUser =  await usersService.getWithId(userId)
            setUser(thisPagesUser)
        }
        //console.log("user view updated")
        fetchUser()
    }, [])
   
    return (
       
        <>
        {
            user !== undefined && blogs !== undefined ?
        <>
            <h2>{user.name}</h2>

            <h3>added blogs</h3>
            <div>
            <Blogs blogs = {userBlogs}></Blogs>

            </div>
        </>
        :
        <></>
        }
        </>
      
    )

}



export default User