import { createSlice } from "@reduxjs/toolkit"


const initialState = ""

const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action){
            const newFilter = action.payload
            state = newFilter
            return state
        }
    }
}
)

export const { setFilter } = filterReducer.actions
export default filterReducer.reducer