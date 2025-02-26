import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    user:null,
    token:null,
    accountDetails: null,
    messages:[],
    recent : null,
    search: null,
    profile:null
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
        },
        setProfile:(state,action)=>{
            state.profile = action.payload
        },
        setSearch:(state,action)=>{
            state.search = action.payload
        }
    }
}) 

export const {setSearch,setProfile,recentMessage,setMessage,setAccountDetails,userReuder,setToken} = uiReducer.actions
export default uiReducer.reducer