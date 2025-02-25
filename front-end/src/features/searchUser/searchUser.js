import { useQuery } from "@tanstack/react-query"

async function SearchUser(params) {
   if(!params.search) return ;
   console.log(params)
    try{
     const result = await fetch(`http://localhost:3000/searching/${params.userid}/search?search=${encodeURIComponent(params.search)}`)
     if(!result.ok){
        throw new Error('There is an error in fetching user')
     }
     const data = await result.json()
     console.log(data)
     return data
    }catch(Err){
        console.log(Err.message)
    }
}

function UseSearchUser(params){
    const {data,isLoading} = useQuery({
        queryKey:['user',params.search],
        queryFn:()=>SearchUser(params),
        enabled:!!params.search,
    })
    return {data,isLoading}
}

export default UseSearchUser;