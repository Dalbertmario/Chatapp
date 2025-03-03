import { useEffect, useState } from "react"
import UseSearchUser from "../features/searchUser/searchUser"
import { useDispatch, useSelector } from "react-redux"
import { userReuder } from "../ui/uistore"
import UseContact from "../features/contact/FetchContact"
import UseMessageFethcingBasedOnUser from "../features/message/FetchUserMessage"
import UseStatusChange from "../features/message/MessageSeenStatus"
import { CgProfile } from "react-icons/cg";

export default function Contact() {
const user = JSON.parse(localStorage.getItem('user')) || {};
const [search,setSearch] = useState('')
const [recipitentId,setRecipitentId] = useState()
const {mutate} =  UseStatusChange()
const {data} = UseSearchUser({userid:user.id,search:search})
const {data:ds,isLoading}=UseMessageFethcingBasedOnUser(recipitentId)
const dispatch = useDispatch()
const {msg} = useSelector(state=>state.uistore)
const api = import.meta.env.VITE_API_HOST
const [contactData,setContactData] = useState([])

useEffect(()=>{
  const users = JSON.parse(localStorage.getItem('user')) || {};
  async function ContactFecth() {
    try{
      const response = await fetch(`${api}/account/contact/${users.id}`)
      if(!response.ok){
       const err = await response.text()
       throw new Error(err || 'Error in fetching the the contacts' )
      }
      const data = await response.json()
      setContactData(data)
      return data 
   }catch(err){
      console.log(err.message)
   }
  }
 ContactFecth()
},[api,msg])

function handelUserClick(el){
  console.log(el)
  const {_id:id} = el._id 
  mutate({senderId:user.id,repId:el._id})
  dispatch(userReuder(el))
  id ? setRecipitentId({repId:id}) : setRecipitentId({repId:el._id }) 
}
  return (
    <div className=" flex flex-col gap-2 sm:w-[100%] xl:w-[30%] lg:w-[50%] md:w-[50%] p-2">
      <input onChange={(e)=>setSearch(e.target.value)} type="text" className="bg-white outline transition-all focus:outline-green-500 focus:outline-3 outline-green-500 w-[100%] p-3 py-2 flex items-center rounded-sm"/>
      {search ? data?.map((el)=>(<button onClick={()=>handelUserClick(el)} className="bg-white gap-2 items-center flex flex-row hover:bg-slate-200 transition-all font-bold p-3 rounded-l text-start" key={el._id}> {el.profile ? <img className="max-w-[50px]" src={`data:image/png;base64,${el?.profile}`}/> : <CgProfile color="grey" size={52}/>}  <span><p>{el?.name}</p><p className="text-xs text-slate-600 font-light">{el.status}</p></span></button>)) :
       contactData?.map((el)=><button onClick={()=>handelUserClick(el)} className="bg-white font-bold outline-1 p-2 outline-slate-500 rounded-l text-start grid items-center grid-cols-[0.5fr_1fr_0.3fr]" key={el?.name}> <> <span>{el?._id.profile ? <img className="max-w-[50px]" src={`data:image/png;base64,${el?._id.profile}`}/> : <CgProfile color="grey" size={52}/>}</span> <span className="flex flex-col"> <p>{el?.name}</p> <p className="text-slate-600 font-light text-xs"> {el.latest}</p></span> <span className={`${el?.notification === 0 ?  ' ' : ' text-sm  text-white grid w-[25px] bg-green-500 justify-center rounded-2xl items-center' }`}>{el?.notification === 0  ? '' : el?.notification}</span> </> </button>)}
    </div>
  )
}
