import { useMutation } from "@tanstack/react-query"
import {toast} from  "react-hot-toast"

async function UpdateAccountDetails(params) {
const api = import.meta.env.VITE_API_HOST
const formData = new FormData()
formData.append("image",params.image)
formData.append("name",params.name)
formData.append("status",params.status)
formData.append('id',params.id)
console.log(params)
    try{
     const responce = await fetch(`${api}/authorization/accountupdate`,{
        method:'POST',
        body:formData
     })
     if(!responce.ok){
        const responceError = responce.text()
        throw new Error(responceError)
     }
    }catch(er){
        console.log(er)
    }
}

function UseUpdateAccount(){
    const {mutate,isLoading} = useMutation({
        mutationFn:(da)=>UpdateAccountDetails(da),
        onSuccess:()=>{
          toast.success('Profile  updated successfully')
        },
        onError:(msg)=>{
            toast.error(msg.message)
        }
    })
    return {mutate ,isLoading}
}

export default UseUpdateAccount;