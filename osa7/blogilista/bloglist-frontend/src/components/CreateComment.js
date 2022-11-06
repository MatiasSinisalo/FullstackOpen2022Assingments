
import { useDispatch, useSelector } from "react-redux"
import commentsService from "../services/comments"
import {setNotificationMessage} from "../reducers/notificationReducer"

import comments from "../services/comments"

import { useEffect } from "react"
const CreateComment = ({id, addLocalComment}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        commentsService.setToken(user.token)
    }, [])


    const handleCommentCreation = async (event) => {
        event.preventDefault()
        const createdComment = await commentsService.create(id, {content: event.target.comment.value}).catch(error => {
            console.log(error.message)
            dispatch(setNotificationMessage({message: `${ error.message }`, style: 'error'}))
            setTimeout(() => {dispatch(setNotificationMessage({message:``, style:''}))}, 5000)
        })
       
        if(!createdComment.error){
            addLocalComment(createdComment)
            dispatch(setNotificationMessage({message: `created comment: "${ createdComment.content }"`, style: 'success'}))
            setTimeout(() => {dispatch(setNotificationMessage({message:``, style:''}))}, 5000)
        }
       
    }
    return (
        
        <div>
            <form onSubmit={handleCommentCreation}>
                comment : <input name="comment" type="text" ></input>
                <button type="submit">add</button>

            </form>
        </div>
        
    )
} 




export default CreateComment