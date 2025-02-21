import { useMutation } from "@tanstack/react-query"

async function MessageSeenStatus(params){
const api = import.meta.env.VITE_API_HOST
    try{
       const responce = await fetch(`${api}/account/contact/status`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(params)
       })
    if(!responce.ok){
        const errorMessage = await responce.text()
        throw new Error(errorMessage || 'There is an error in changing status of the messages')
    }
    }catch(err){
     console.log(err.message)
    }
}

function UseStatusChange(){
    const {mutate,isLoading}=useMutation({
        mutationFn:(da)=>MessageSeenStatus(da)
    })
    return {mutate,isLoading}
}

export default UseStatusChange;