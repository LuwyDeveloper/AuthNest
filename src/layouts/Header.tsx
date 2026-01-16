import { useLocation, Link } from "react-router-dom";
import { PanelLeftOpen, House } from "lucide-react";
import useSidebarStatus from "../hooks/useSidebarStatus";

export const Header = () => {
  const location = useLocation();

  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const routeTitles: { [key: string]: string } = {
    "/": "Dashboard - Mocks",
    "/apidashboard": "Dashboard - API",

  };

  const title = routeTitles[location.pathname] || "";

  return (
    <header className="sticky top-0 z-1000 pt-2 md:hidden">
      <div className=" border border-blue-900 shadow-sm md:px-6 px-3 py-2 mt-2 rounded-lg mb-10  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 divide-x divide-dashed  divide-blue-300 ">
            <button
              className="flex ml-4 pr-2 text-white items-center cursor-pointer justify-center md:hidden"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <PanelLeftOpen strokeWidth={1.5} className=" h-5 w-5"/>
            </button>

            <div className="flex items-center md:gap-3 gap-2 py-2 text-white">
              <Link to={"/"}>
                <House className="md:h-4 md:w-4 h-4 w-4" />
              </Link>
              <Link className={`flex items-center gap-1 before:pe-2 before:content-["/"] text-xs `} to={location.pathname}>
                   <b className="text-sm md:text-md font-normal">
                    {title}
                  </b>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};
