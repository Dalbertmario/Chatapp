import { NavLink } from "react-router-dom";
import UseSingIn from "../features/login/signIn";
import { useForm } from "react-hook-form";
import UseAuth from "../features/login/Auth";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import GoogleButton from 'react-google-button'



function navigate (url){
    window.location.href = url
}

async function  auth() {
    const responce=  await fetch(`http://localhost:3000/request`,{
        method:'POST',
    })
    const data = await responce.json()
    navigate(data.url)
}
export default function LoginPage() {
const {mutate,isLoading}=UseSingIn()
const {register,handleSubmit} = useForm()
const {mutate:AuthMutate} = UseAuth()
const {token}= useSelector(state=>state.uistore)
function handelForm(data){
     mutate(data)
     localStorage.removeItem('user')
}

useEffect(()=>{
    if(token !== null){
        AuthMutate()
    }
},[token,AuthMutate])
 return (
    <form onSubmit={handleSubmit(handelForm)}>
    <div className="bg-slate-100 flex gap-5 font-stretch-50% rounded-xl flex-col p-5 m-auto mt-[200px] max-w-[400px]">
        <h1 className="font-semibold text-xl text-green-400 font-mono">WhatsApp</h1>
       <input {...register('name')} className="inputbtn" type="text" placeholder="Username"/>
       <input  {...register('password')} className="inputbtn" type="password" placeholder="Password"/>
       <button disabled={isLoading} className="btn">Sign In</button>
       <p className="text-slate-400">Create a new account  <NavLink to='/signUp'><span className="text-blue-500">Sign Up</span></NavLink></p>
       <GoogleButton onClick={()=>auth()}/>
       </div>
    </form>
  )
}
