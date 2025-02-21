import { useState } from "react"
import UseSearchUser from "../features/searchUser/searchUser"
import { useDispatch } from "react-redux"
import { userReuder } from "../ui/uistore"
import UseContact from "../features/contact/FetchContact"
import UseMessageFethcingBasedOnUser from "../features/message/FetchUserMessage"
import UseStatusChange from "../features/message/MessageSeenStatus"

export default function Contact() {
const [search,setSearch] = useState('')
const {data:contactData} = UseContact()
const [recipitentId,setRecipitentId] = useState()
const {mutate} =  UseStatusChange()
const user = JSON.parse(localStorage.getItem('user'))
const {data} = UseSearchUser({userid:user.id,search:search})
const {data:ds,isLoading}=UseMessageFethcingBasedOnUser(recipitentId)
const dispatch = useDispatch()
function handelUserClick(el){
  mutate({senderId:user.id,repId:el._id})
  dispatch(userReuder(el))
  setRecipitentId({repId:el._id,})
}

  return (
    <div className="bg-white flex flex-col gap-3 h-screen sm:w-[100%] xl:w-[30%] lg:w-[50%] md:w-[50%] p-2">
      <p className="text-green-400 font-semibold text-xl">WhatApp</p>
      <input onChange={(e)=>setSearch(e.target.value)} type="text" className="bg-white outline transition-all focus:outline-green-500 focus:outline-3 outline-green-500 w-[100%] p-3 py-2 flex items-center rounded-sm"/>
      {search ? data?.map((el)=>(<button onClick={()=>handelUserClick(el)} className="bg-white  hover:bg-slate-200 transition-all font-bold p-3 rounded-l text-start" key={el.id}>{el.name}</button>)) : contactData?.map((el)=><button onClick={()=>handelUserClick(el)} className="bg-white font-bold outline-1 outline-slate-500 p-3 rounded-l text-start" key={el._id}>{el.name}</button>)}
    </div>
  )
}
