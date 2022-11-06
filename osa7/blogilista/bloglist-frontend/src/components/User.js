import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Blogs from "../components/Blogs"
import usersService from "../services/users"
const User = () => {


    const [user, setUser] = useState({id: undefined, name: undefined, blogs: []})
    const userId = useParams().id
    
    useEffect(() => {
        async function fetchUser(){
            const thisPagesUser =  await usersService.getWithId(userId)
            console.log(thisPagesUser)
            setUser(thisPagesUser)
        }
        //console.log("user view updated")
        fetchUser()
    }, [])
   
    return (
       
        <>
        {
            user !== undefined ?
        <>
            <h2>{user.name}</h2>

            <h3>added blogs</h3>
            <div>
            <Blogs filterByUserID = {user.id}></Blogs>

            </div>
        </>
        :
        <></>
        }
        </>
      
    )

}



export default User