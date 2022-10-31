import { createSlice } from "@reduxjs/toolkit"




const initialState = "notification set by notificationReducer"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationText(state, action){
            const newNotification = action.payload
            state = newNotification
            return state
        }
    }
})


export const setNotification = (notification, durationSeconds) => {
    return async dispatch => {
        dispatch(setNotificationText(`${notification}`))
        setTimeout(() => {
            dispatch(setNotificationText(``))
        }, durationSeconds * 1000);
    }
}


export const {setNotificationText} = notificationSlice.actions

export default notificationSlice.reducer