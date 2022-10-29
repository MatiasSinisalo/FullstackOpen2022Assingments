import { createSlice } from "@reduxjs/toolkit"




const initialState = "notification set by notificationReducer"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            const newNotification = action.payload
            state = newNotification
        }
    }
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer