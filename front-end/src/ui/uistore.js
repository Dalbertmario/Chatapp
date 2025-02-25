import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    user:null,
    token:null,
    accountDetails: null,
    messages:[],
    recent : null 
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
        },
        recentMessage:(state,action)=>{
            state.recent = action.payload
        }
    }
}) 

export const {recentMessage,setMessage,setAccountDetails,userReuder,setToken} = uiReducer.actions
export default uiReducer.reducer