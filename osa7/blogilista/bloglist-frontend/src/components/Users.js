import { useEffect, useState } from "react"
import usersService from "../services/users"

const UserStatistic = ({name, blogCount}) => {
    return (
        <>
        <tr>
            <td>{name}</td>
            <td>{blogCount}</td>
        </tr>
        </>
    )
}



const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers(){
            console.log("allUsers")
            const allUsers = await usersService.getAll()
            const sortedUsers = allUsers.sort((a, b) =>  b.blogs.length - a.blogs.length )
            setUsers(allUsers)
            console.log(allUsers)
        }
        getUsers()
    }, [])

    
    return (
        <div>
        <h3>Users</h3>
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td>Blogs created</td>
                </tr>
                
                
                {
                    users.map(user => <UserStatistic key={user.id} name={user.name} blogCount={user.blogs.length}/>)
                }
               
               
            </tbody>
        </table>



        </div>
    )

}


export default Users