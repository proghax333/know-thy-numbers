import { ChevronDown, ChevronFirst, ChevronLast, ChevronUp } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, route, subitems }) {
  const { expanded } = useContext(SidebarContext);
  const [subitemsExpanded, setSubitemsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <li className={`relative flex flex-col items-start group`}>
      <div
        onClick={() => (location.href = route)}
        className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group z-50 ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
        {subitems && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSubitemsExpanded((curr) => !curr);
            }}
            className="ml-auto"
          >
            {subitemsExpanded && expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        )}
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </div>
      {subitems && subitemsExpanded && expanded && (
        <ul className="pl-5">
          {subitems.map((subitem, index) => (
            <SidebarItem key={index} {...subitem} />
          ))}
        </ul>
      )}
    </li>
  );
}
