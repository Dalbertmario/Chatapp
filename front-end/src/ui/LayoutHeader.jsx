import { useRef, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header({user}) {
const [hovering,setHover] = useState(false)
const [position,setPosition] = useState(null)
const {profile} = useSelector(state=>state.uistore)
const ref = useRef()
function OnMouseOverFn(){
   setHover(e=>!e)
   const pos = ref.current.getBoundingClientRect()
   setPosition({ top: pos.bottom + window.scrollY-25, left: pos.left-50, width: pos.width }); 
}
  return (
  <>
    <div className="bg-white p-4 flex flex-row justify-between">
      <div>
      <p className="text-green-400 font-semibold text-xl">WhatApp</p>
      </div>
      <div className="flex  gap-5 items-center">
        <h1 className="font-semibold font-mono text-[15px]">{user}</h1>
        <button ref={ref} onMouseOver={()=>OnMouseOverFn()}>
        <NavLink to='/setting'> {profile ? <img src={profile}/> : <MdOutlineAccountCircle color="green" size={30}/> }</NavLink>
        </button>
        </div>
    </div>
    </>
  )
}
