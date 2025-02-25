import { useQuery } from "@tanstack/react-query"

async function FetchingAccountDetails(params) {
const api = import.meta.env.VITE_API_HOST
    try{
     const responce = await fetch(`${api}/authorization/userData/${params}`)
     if(!responce.ok){
        const errorResponce = await responce.text()
        throw new Error(errorResponce || 'There is an error in fetching user data')
     }
     const data = await responce.json()
     console.log(data)
     return data
    }catch(err){
        console.log(err.message)
    }
}

function UseFetchingAccount(params){
    const {data,isLoading} = useQuery({
        queryKey:['account',params],
        queryFn:()=>FetchingAccountDetails(params),
        enabled : !! params
    })
    return {data,isLoading}
}

export default UseFetchingAccount;