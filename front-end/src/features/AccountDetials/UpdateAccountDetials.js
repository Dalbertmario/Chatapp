import { useMutation } from "@tanstack/react-query"

async function UpdateAccountDetails(params) {
const api = import.meta.env.VITE_API_HOST
const formData = new FormData()
formData.append("image",params.image[0])
formData.append("name",params.name)
formData.append("status",params.status)
formData.append('id',params.id)
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
        mutationFn:(da)=>UpdateAccountDetails(da)
    })
    return {mutate ,isLoading}
}

export default UseUpdateAccount;