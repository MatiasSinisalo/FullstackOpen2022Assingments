import { createSlice } from "@reduxjs/toolkit"

const initialState = {content: "notification set by notificationReducer", timeoutID: undefined}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getCurrentNotification(state, action){
            console.log(state.content)
            return state
        },
        setNotificationText(state, action){
            state = {...state, content: action.payload}
            return state
        },
        setNotificationTimeoutID(state, action){
            state =  {...state, timeoutID: action.payload}
        
            return state
        }
    }
})





export const setNotification = (notification, durationSeconds) => {

    return async (dispatch, getState) => {
      
        const prevId = getState().notification.timeoutID
        clearTimeout(prevId)

        dispatch(setNotificationText(`${notification}`))

        const timeoutID = setTimeout(() => {
            dispatch(setNotificationText(``))
            }, durationSeconds * 1000);
        
        dispatch(setNotificationTimeoutID(timeoutID))
       
    }
}


export const {getCurrentNotification, setNotificationText, setNotificationTimeoutID} = notificationSlice.actions

export default notificationSlice.reducer