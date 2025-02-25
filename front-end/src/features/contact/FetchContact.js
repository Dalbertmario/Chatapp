import { useQuery } from "@tanstack/react-query"

async function  ContactFetcher(id) {
const api = import.meta.env.VITE_API_HOST

    try{
       const response = await fetch(`${api}/account/contact/${id}`)
       if(!response.ok){
        const err = await response.text()
        throw new Error(err || 'Error in fetching the the contacts' )
       }
       const data = await response.json()
       return data 
    }catch(err){
       console.log(err.message)
    }
}

function UseContact({id}){
    const {data,isLoading}=useQuery({
        queryKey:['contact',id],
        queryFn:()=>ContactFetcher(id)
        
    })
    return {data,isLoading}
}

export default UseContact