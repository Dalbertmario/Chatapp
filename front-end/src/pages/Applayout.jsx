import { Outlet } from "react-router-dom";
import LayoutHeader from "../ui/LayoutHeader";
export default function Applayout() {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
        <LayoutHeader user={user?.name}/>
        <div>
        <Outlet/>
        </div>
    </div>
  )
}
