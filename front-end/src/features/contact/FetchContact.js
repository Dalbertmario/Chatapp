import { useQuery } from "@tanstack/react-query"

async function  ContactFetcher() {
const api = import.meta.env.VITE_API_HOST
const id = JSON.parse(localStorage.getItem('user'))
    try{
       const response = await fetch(`${api}/account/contact/${id.id}`)
       if(!response.ok){
        const err = await response.text()
        throw new Error(err || 'Error in fetching the the contacts' )
       }
       const data = await response.json()
       console.log(data)
       return data 
    }catch(err){
       console.log(err.message)
    }
}

function UseContact(){
    const {data,isLoading}=useQuery({
        queryKey:['contact'],
        queryFn:ContactFetcher
    })
    return {data,isLoading}
}

export default UseContact