
import { useEffect, useState } from "react"
import commentsService from "../services/comments"
import CreateComment from "./CreateComment"
const Comments = ({blogComments, id}) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
       
        setComments(blogComments)
    }, [])
    
    const addLocalComment = (comment) => {
        setComments(comments.concat(comment))
    }

    return(
        <>
           
          <div className="commentsSection">
            <h3>Comments</h3>
            <CreateComment id = {id} addLocalComment = {addLocalComment}/> 
            <ul>
            {
               comments !== undefined ? comments.map(comment => (<li className="singleComment" key={comment.id}>{comment.content}</li>)) : <p>no comments</p>
            }
           
            </ul>
          </div>
        </>
    )
}

export default Comments