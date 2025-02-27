import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { settingMessage } from "../../ui/uistore"

async function MessageFetching(params) {
    const api =import.meta.env.VITE_API_HOST
    const user = JSON.parse(localStorage.getItem('user'))
    try{
       const responce = await fetch(`${api}/account/contact/message`,{
           method:"POST",
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify({...params,senderId:user.id})
       })
     if(!responce.ok){
        const errorText = await responce.text()
        throw new Error(errorText || 'There is error in fetching the users message')
     }
     const data = await responce.json()
     return data
    }catch(er){
        console.log(er.message)
    }
}

function UseMessageFethcingBasedOnUser(params){
const dispatch = useDispatch()
    const {data,isLoading}=useQuery({
        queryKey:['message',params],
        queryFn: ()=>MessageFetching(params),
        enabled:!!params
    })
   dispatch(settingMessage(data))
    return {data,isLoading}
}

export default UseMessageFethcingBasedOnUser;