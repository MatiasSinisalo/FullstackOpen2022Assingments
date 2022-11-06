import { useEffect, useState } from "react"
import usersService from "../services/users"
import { Link } from "react-router-dom"
const UserStatistic = ({id, name, blogCount}) => {
    return (
        <>
        <tr>
            <td><Link to={`/users/${id}`}><button className="userTableEntry">{name}</button></Link></td>
            <td>{blogCount}</td>
        </tr>
        </>
    )
}



const Users = () => {
    const [users, setUsers] = useState([])

    
    useEffect(() => {
        async function getUsers(){
          
            const allUsers = await usersService.getAll()
            const sortedUsers = allUsers.sort((a, b) =>  b.blogs.length - a.blogs.length )
            setUsers(allUsers)
           
        }
        getUsers()
    }, [])

    
    return (
        <div>
        <h1>Users</h1>
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td>Blogs created</td>
                </tr>
                
                
                {
                    users.map(user => <UserStatistic key={user.id} id={user.id} name={user.name} blogCount={user.blogs.length}/>)
                }
               
               
            </tbody>
        </table>



        </div>
    )

}


export default Users