import { createSlice , configureStore } from '@reduxjs/toolkit'
import { data } from './DateStore'

const makeSlice = createSlice({
    name : "Data",
    initialState : JSON.parse(localStorage.getItem('Values')) ||data,
    reducers :{
        add(state,action){ return [...state,action.payload]},
        remove(state,action){ 
            return state.filter((va,i) => i !== action.payload.index)
        }
    }
})
export const action = makeSlice.actions

const store = configureStore({
    reducer : makeSlice.reducer
})

export default store