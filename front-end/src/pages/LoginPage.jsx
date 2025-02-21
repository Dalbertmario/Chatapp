import { NavLink } from "react-router-dom";
import UseSingIn from "../features/login/signIn";
import { useForm } from "react-hook-form";
import UseAuth from "../features/login/Auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LoginPage() {
const {mutate,isLoading}=UseSingIn()
const {register,handleSubmit} = useForm()
const {mutate:AuthMutate} = UseAuth()
const {token}= useSelector(state=>state.uistore)
function handelForm(data){
     mutate(data)
}
useEffect(()=>{
    if(token !== null){
        AuthMutate()
    }
},[token,AuthMutate])
console.log(token)
 return (
    <form onSubmit={handleSubmit(handelForm)}>
    <div className="bg-slate-100 flex gap-5 font-stretch-50% rounded-xl flex-col p-5 m-auto mt-[200px] max-w-[400px]">
        <h1 className="font-semibold text-xl text-green-400 font-mono">WhatsApp</h1>
       <input {...register('name')} className="inputbtn" type="text" placeholder="Username"/>
       <input  {...register('password')} className="inputbtn" type="password" placeholder="Password"/>
       <button disabled={isLoading} className="btn">Sign In</button>
       <p className="text-slate-400">Create a new account  <NavLink to='/signUp'><span className="text-blue-500">Sign Up</span></NavLink></p>
       </div>
    </form>
  )
}
