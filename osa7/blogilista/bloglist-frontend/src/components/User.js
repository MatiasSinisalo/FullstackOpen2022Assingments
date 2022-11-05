import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Blogs from "../services/blogs"
import usersService from "../services/users"
const User = () => {


    const [user, setUser] = useState({id: undefined, name: undefined, blogs: []})
    const userId = useParams().id
    
    useEffect(() => {
        async function fetchUser(){
            const thisPagesUser =  await usersService.getWithId(userId)
            setUser(thisPagesUser)
        }
        fetchUser()
    }, [])
   
    return (
        <>
        <h2>{user.name}</h2>

        <h3>added blogs</h3>
        <div>
            <ul>
                {
                    user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
                }
            </ul>

        </div>
        </>
    )

}



export default User