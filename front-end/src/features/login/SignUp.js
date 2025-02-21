import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

async function Signup(params) {
const api = import.meta.env.VITE_API_HOST 
      const result = await fetch(`${api}/authorization/signup`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(params)
      })
    if(!result.ok){
        const errorMessage = await result.text()
       throw new Error(errorMessage ||"Error in creating account")
    }
}

function UseSignUp(){
const navigate = useNavigate()
    const {mutate,isLoading}=useMutation({
        mutationFn:(ds)=>Signup(ds),
        onSuccess:()=>{
            toast.success('User created successfully')
            navigate('/signIn')
        },onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {mutate,isLoading}
}
export default UseSignUp