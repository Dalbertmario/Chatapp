import { useState } from "react"
import UseSearchUser from "../features/searchUser/searchUser"
import { useDispatch } from "react-redux"
import { userReuder } from "../ui/uistore"
import UseContact from "../features/contact/FetchContact"
import UseMessageFethcingBasedOnUser from "../features/message/FetchUserMessage"
import UseStatusChange from "../features/message/MessageSeenStatus"
import { CgProfile } from "react-icons/cg";

export default function Contact() {
const user = JSON.parse(localStorage.getItem('user')) || {};
const [search,setSearch] = useState('')
const {data:contactData} = UseContact({id:user.id})
const [recipitentId,setRecipitentId] = useState()
const {mutate} =  UseStatusChange()
const {data} = UseSearchUser({userid:user.id,search:search})
const {data:ds,isLoading}=UseMessageFethcingBasedOnUser(recipitentId)
const dispatch = useDispatch()
function handelUserClick(el){
  const {_id:id} = el._id 
  mutate({senderId:user.id,repId:el._id._id})
  dispatch(userReuder(el))
  id ? setRecipitentId({repId:id}) : setRecipitentId({repId:el._id }) 
}

  return (
    <div className=" flex flex-col gap-3 sm:w-[100%] xl:w-[30%] lg:w-[50%] md:w-[50%] p-2">
      <input onChange={(e)=>setSearch(e.target.value)} type="text" className="bg-white outline transition-all focus:outline-green-500 focus:outline-3 outline-green-500 w-[100%] p-3 py-2 flex items-center rounded-sm"/>
      {search ? data?.map((el)=>(<button onClick={()=>handelUserClick(el)} className="bg-white  hover:bg-slate-200 transition-all font-bold p-3 rounded-l text-start" key={el._id}> {el?.name}</button>)) :
       contactData?.map((el)=><button onClick={()=>handelUserClick(el)} className="bg-white font-bold outline-1 outline-slate-500 p-3 rounded-l text-start flex flex-col justify-between" key={el?.name}> <> <span>{el?._id.profile ? <img src={el?._id.profile}/> : <CgProfile/>}</span>{el?.name} <span className={`${el?.notification === 0 ?  ' ' : 'bg-green-400 text-sm px-2 text-slate-700 flex items-center rounded-3xl' }`}>{el?.notification === 0  ? '' : el?.notification}</span> </> <p className="text-slate-300 text-xs"> {el.latest}</p> </button>)}
    </div>
  )
}
