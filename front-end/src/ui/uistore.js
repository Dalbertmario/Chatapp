import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    user:null,
    token:null,
    accountDetails: null,
    messages:[]
}

const uiReducer = createSlice({
    name:'uistore',
    initialState,
    reducers :{
        userReuder:(state,action)=>{
            state.user = action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setAccountDetails:(state)=>{
            state.accountDetails = JSON.parse(localStorage.getItem('user'))
        },
        setMessage:(state,action)=>{
            state.messages = action.payload
        }
    }
}) 

export const {setMessage,setAccountDetails,userReuder,setToken} = uiReducer.actions
export default uiReducer.reducer