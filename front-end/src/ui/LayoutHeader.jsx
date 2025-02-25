import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Header({user}) {
  return (
    <div className="bg-white p-4 flex flex-row justify-between">
      <div>
      <p className="text-green-400 font-semibold text-xl">WhatApp</p>
      </div>
      <div className="flex  gap-5 items-center">
        <h1 className="font-semibold font-mono text-[15px]">{user}</h1>
        <NavLink to='/setting'> <MdOutlineAccountCircle color="green" size={30}/></NavLink>
        </div>
    </div>
  )
}
