import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
import { LuSendHorizontal } from "react-icons/lu";
import Header from "../ui/Header";
import { useSelector } from "react-redux";
import EmptyScreen from "../ui/EmptyScreen";
import DateTime from "../helper/datetimeFormate";
export default function ChatSide() {
const [input,Inputmessage]=useState()
const {user,messages} =useSelector(state=>state.uistore)
const socket = useRef(null)
const account = JSON.parse(localStorage.getItem('user'))
const [message,setMessage] = useState([])

useEffect(()=>{
   setMessage([])
   setMessage(messages)
},[messages])
console.log(message)
useEffect(()=>{
  if(!socket.current){
    socket.current =  io("http://localhost:3000",{
      withCredentials:false
    })
  }
  socket.current.emit('register',account?.id)
  socket.current.on("receiveMessage",(dta)=>{
    console.log(dta)
     setMessage((e)=>[...e,dta])
  })
},[account?.id])

function handelMessage(){
   socket.current.emit("message",{message:input,reciverID:user._id,senderID:account.id}) 
}
console.log(message )
  return (
 <>
   {!user ? <EmptyScreen/> :  <div className="w-full bg-amber-50 flex flex-col justify-between">
    <Header username={user}/>
     <div className="flex flex-col gap-2 justify-center">
     <div className="flex h-[800px] overflow-auto flex-col gap-2 p-2">
      {message?.map((el,i)=><div key={i}>
        <p className={`${el.senderId === account.id ? 'relative right-0 p-2 flex flex-col gap-4 rounded-3xl bg-green-100 max-w-[40%]  ' : 'relative bg-red-50 max-w-[40%] p-2 rounded-3xl  left-0' } flex flex-col`}>{el.message} <span className="text-[10px] text-slate-600">{ DateTime(el.timeStamp)}</span></p>
      </div>)}
     </div>
     <div className="flex  mb-3 flex-row gap-2 justify-center">
     <input className="bg-slate-100 rounded-l focus:outline-2 focus:outline-green-300 w-[90%] p-2" onChange={(e)=>Inputmessage(e.target.value)}  type="text"/>
     <button className="hover:text-green-300" onClick={()=>handelMessage()}><LuSendHorizontal size={20}/></button>
     </div>
     </div>
</div> }
</>
  )
}
