import { useForm } from "react-hook-form"
import UseFetchingAccount from "../features/AccountDetials/fetchAccount"
import { useEffect, useState } from "react"
import { CgProfile } from "react-icons/cg";
import UseUpdateAccount from "../features/AccountDetials/UpdateAccountDetials";
import { useDispatch } from "react-redux";
import { setProfile } from "../ui/uistore";

export default function AccountPage() {
  const {mutate,isLoading:AccountLoading} = UseUpdateAccount()
  const {register,reset,handleSubmit} = useForm()
  const [inputData,setInputData] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const {data} = UseFetchingAccount(user.id)
  const dispatch = useDispatch()
  useEffect(()=>{
   reset({
    name : data?.name,
    status:data?.status,
    image:data?.profile
   })
  //  dispatch(setProfile(data?.profile))
  
  },[data,reset,dispatch])
 function handelForm(data){
     mutate({...data})
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
         <input disabled={AccountLoading} {...register('image')} onChange={(e)=>handelImageInput(e.target.files[0])} type="file" className="hidden" />
          {inputData ?  <img src={inputData}/> : <CgProfile color="grey" size={60} />  } 
         </label>
         <div className="flex flex-row justify-center gap-5 items-center">
         <label className="font-semibold font-stretch-50%">Name</label>
         <input disabled={AccountLoading} {...register('name')} className=" transition-all text-slate-600 focus:bg-white border-b-1 p-1  focus:outline-green-500  " type="text" placeholder="Name"/>
         </div>
         <div className="flex flex-row justify-center gap-5 items-center">
          <label  className="font-semibold font-stretch-50%">Status</label>
         <input disabled={AccountLoading} className=" transition-all text-slate-600 focus:bg-white border-b-1 p-1  focus:outline-green-500 " type="text" {...register('status')}/>
         </div>
         <input disabled={AccountLoading} {...register('id')} value={user.id} className="hidden"/>
         <button className="btn">Update</button>
    </form>
  )
}
