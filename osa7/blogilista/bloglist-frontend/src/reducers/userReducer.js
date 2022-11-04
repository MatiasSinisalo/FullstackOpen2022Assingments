import { createSlice } from "@reduxjs/toolkit";

const initialState = {token: undefined, id: undefined, username: undefined}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setUser(state, action){
        return action.payload
       }
    }
})

export const { setUser } = userReducer.actions

export default userReducer.reducer