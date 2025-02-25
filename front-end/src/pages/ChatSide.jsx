import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
import { LuSendHorizontal } from "react-icons/lu";
import Header from "../ui/Header";
import { useSelector } from "react-redux";
import EmptyScreen from "../ui/EmptyScreen";
import DateTime from "../helper/datetimeFormate";
export default function ChatSide() {
const [input,Inputmessage]=useState("")
const {user,messages} =useSelector(state=>state.uistore)
const socket = useRef(null)
const account = JSON.parse(localStorage.getItem('user'))
const [message,setMessage] = useState([])

useEffect(()=>{
   setMessage(messages)
},[messages])

useEffect(()=>{
  if(!socket.current){
    socket.current =  io("http://localhost:3000",{
      withCredentials:false
    })
  }
  socket.current.emit('register',account?.id)
  const handleReceiveMessage = (dta) => {
    setMessage((prev) => [...prev, dta]);
  };

  return () => {
    socket.current.off("receiveMessage", handleReceiveMessage);
  };
  
},[account?.id])

function handelMessage(){
   socket.current.emit("message",{message:input,reciverID:user._id,senderID:account.id}) 
   setMessage(e=>[...e,{message:input,reciverId:user._id,senderId:account.id,timeStamp:Date.now()}])
   Inputmessage('')
}
  return (
 <>
   {!user ? <EmptyScreen/> : 
    <div className="w-full bg-red-100 flex flex-col justify-between">
    <Header username={user}/>
     <div className="flex flex-col gap-2 justify-center">
     <div className="flex h-[745px] overflow-auto flex-col gap-2 p-2">
     {message?.map((el, i) => (
  <div key={i} className="flex flex-col ">
    <div
      className={`max-w-[40%] p-2 rounded-xl flex flex-col break-words ${
        el.senderId === account.id
          ? 'bg-green-100 self-end'
          : 'bg-red-50 self-start'
      }`}
    >
      <p className="whitespace-pre-wrap break-words">
        {el.message}{" "}
        <span className="text-[10px] text-slate-600">
          {DateTime(el.timeStamp)}
        </span>
      </p>
    </div>
  </div>
))}

     </div>
     <div className="flex  mb-3 flex-row gap-2 justify-center">
     <input value={input} className="bg-slate-100 rounded-l focus:outline-2 focus:outline-green-300 w-[90%] p-2" onChange={(e)=>Inputmessage(e.target.value)}  type="text"/>
     <button className="hover:text-green-300" onClick={()=>handelMessage()}><LuSendHorizontal size={20}/></button>
     </div>
     </div>
</div> }
</>
  )
}
