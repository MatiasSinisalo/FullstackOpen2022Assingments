
import { useEffect, useState } from "react"
import commentsService from "../services/comments"
import CreateComment from "./CreateComment"
const Comments = ({blogComments, id}) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
       
        setComments(blogComments)
    }, [])

    useEffect(() => {
        console.log(blogComments)
    }, [blogComments])



    
    const addLocalComment = (comment) => {
        setComments(comments.concat(comment))
    }

    return(
        <>
            <CreateComment id = {id} addLocalComment = {addLocalComment}/>
            <p>Comments</p>
            <ul>
            {
               comments !== undefined ? comments.map(comment => (<li key={comment.id}>{comment.content}</li>)) : <p>no comments</p>
            }
            </ul>
        </>
    )
}

export default Comments