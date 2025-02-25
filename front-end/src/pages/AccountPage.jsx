import { useForm } from "react-hook-form"
import UseFetchingAccount from "../features/AccountDetials/fetchAccount"
import { useEffect, useState } from "react"
import { CgProfile } from "react-icons/cg";
import UseUpdateAccount from "../features/AccountDetials/UpdateAccountDetials";

export default function AccountPage() {
  const [vals,setVales] = useState('')
  const {mutate,isLoading:AccountLoading} = UseUpdateAccount()
  const {register,reset,handleSubmit} = useForm()
  const [inputData,setInputData] = useState({})
  const user = JSON.parse(localStorage.getItem('user'))
  const {data,isLoading} = UseFetchingAccount(user.id)
  useEffect(()=>{
   reset({
    name : data?.name,
    status:data?.status,
    image:data?.image
   })
  
  },[data,reset])
 function handelForm(data){
     mutate({...data,id:user.id})
 }
function handelImageInput(e){
   const reader = new FileReader()
   reader.onload= ()=>{
    setInputData(reader.result)
   }

   reader.readAsDataURL(e)
}
 
  return (
    <form onSubmit={handleSubmit(handelForm)} className="flex p-4 rounded-2xl bg-slate-100 mt-[200px] flex-col gap-3 justify-center  w-[500px] m-auto">
        <h1 className="text-xl text-green-500 font-semibold">Update Your Profile</h1>
        <label className="cursor-pointer m-auto max-w-[100px] flex items-center gap-2">
         <input {...register('image')} onChange={(e)=>handelImageInput(e.target.files[0])} type="file" className="hidden" />
          {inputData ?  <img src={inputData}/> : <CgProfile color="grey" size={60} />  } 
         </label>
         <input {...register('name')} className=" transition-all focus:bg-white border-b-1 p-1  focus:outline-green-500  " type="text" placeholder="Name"/>
         <input className=" transition-all focus:bg-white border-b-1 p-1  focus:outline-green-500 " type="text" {...register('status')}/>

         <button className="btn">Update</button>
    </form>
  )
}
