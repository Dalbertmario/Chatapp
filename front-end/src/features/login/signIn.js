import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { setToken } from "../../ui/uistore"
import { useNavigate } from "react-router-dom"


const api = import.meta.env.VITE_API_HOST
async function signIn(params) {
     const result = await fetch(`${api}/authorization/signin`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(params)
     })
    if(!result.ok){
        const responceError = await result.text()
        console.log(responceError)
        throw new Error(responceError || 'Error in SignIning')
    }
    const token = await result.json()
    localStorage.removeItem('user')
    localStorage.setItem('token', JSON.stringify(token))
    return token
}
function UseSingIn(){
const dispatch = useDispatch()

    const {mutate,isLoading} = useMutation({
        mutationFn:(da)=>signIn(da),
        onSuccess:(ds)=>{
            dispatch(setToken(ds))
        }
    })
    return {mutate,isLoading}
}

export default UseSingIn;