import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Header({username}) {
  
  return (
    <div className="bg-white p-4 flex flex-row justify-between">
        <p className="font-semibold">{username?.name}</p>
    </div>
  )
}
