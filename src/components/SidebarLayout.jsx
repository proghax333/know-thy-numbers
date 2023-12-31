import { Home, Grid3X3, Plus, LogOut } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar"
import { useNavigate, Outlet } from "react-router-dom";

function SidebarLayout() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row">
        <Sidebar>
          {/* <SidebarItem icon={<Home size={20} />} text="Home" route={"/login"} /> */}
          <SidebarItem icon={<Grid3X3 size={20} />} text="Listing" route={"/home/table"} />
          <SidebarItem icon={<Plus size={20} />} text="Add Data" route={"/home/upload_data"} />
          <hr className="my-3" />
          <SidebarItem icon={<LogOut size={20} />} text="Logout" route={"/login"} />
        </Sidebar>
        <div className="flex-grow">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default SidebarLayout