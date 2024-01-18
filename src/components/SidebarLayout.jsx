import { Home, Grid3X3, Plus, LogOut, ArrowRight } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar"
import { useNavigate, Outlet } from "react-router-dom";

function SidebarLayout() {
  const navigate = useNavigate();

  const namesArr = [
    {
      "text": "Point Of Security",
      "route": "/home/table?filterText=Point Of Security&filterOption=name"
    },
    {
      "text": "Karma",
      "route": "/home/table?filterText=Karma&filterOption=name"
    },
    {
      "text": "Subconscious",
      "route": "/home/table?filterText=Subconscious&filterOption=name"
    },
    {
      "text": "Intensification",
      "route": "/home/table?filterText=Intensification&filterOption=name"
    },
    {
      "text": "Personal Day",
      "route": "/home/table?filterText=Personal Day&filterOption=name"
    },
    {
      "text": "Personal Month",
      "route": "/home/table?filterText=Personal Month&filterOption=name"
    },
    {
      "text": "Personal Year",
      "route": "/home/table?filterText=Personal Year&filterOption=name"
    },
    {
      "text": "Birth Day",
      "route": "/home/table?filterText=Birth Day&filterOption=name"
    },
    {
      "text": "Core Number Combo",
      "route": "/home/table?filterText=Core Number Combo&filterOption=name"
    },
    {
      "text": "Life Path",
      "route": "/home/table?filterText=Life Path&filterOption=name"
    },
    {
      "text": "Personality",
      "route": "/home/table?filterText=Personality&filterOption=name"
    },
    {
      "text": "Soul",
      "route": "/home/table?filterText=Soul&filterOption=name"
    },
    {
      "text": "Pinnacles",
      "route": "/home/table?filterText=Pinnacles&filterOption=name"
    },
    {
      "text": "Challenges",
      "route": "/home/table?filterText=Challenges&filterOption=name"
    }
  ]

  return (
    <>
      <div className="flex flex-row">
        <Sidebar>
          <SidebarItem icon={<Plus size={20} />} text="Add Data" route={"/home/upload_data"} />
          <SidebarItem icon={<Grid3X3 size={20} />} text="All Data" route={"/home/table"} 
            subitems={namesArr}
            />
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