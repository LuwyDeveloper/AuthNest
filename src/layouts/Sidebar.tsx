import { useState, useEffect } from "react";
import type React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, PanelLeftOpen, Power, Menu, ChartArea , ChartNetwork ,  } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "../auth/auth.store";
import useSidebarStatus from "../hooks/useSidebarStatus";
import { perfil, logo_luwydyro_dark } from "../assets/images";
import { useSessionTimer } from "../hooks/useTimer";
import { useIdleTimer } from "../hooks/useTimerIdle";

type MenuChild = {
  label: string;
  href?: string;
};

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuChild[];
  onAction?: () => void;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const homeItem: MenuItem = { label: "Dashboard - Mocks", icon: ChartArea, href: "/" };
const homeItem2: MenuItem = { label: "Dashboard - API", icon: ChartNetwork, href: "/apidashboard" };

const SessionCountdown = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
  const timeLeft = useSessionTimer();

  if (timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const isEnding = timeLeft <= 120_000;

  return (
    <div className="px-3 pb-4">
      <div
        className={`flex flex-col items-center justify-center py-3 border rounded-lg transition-all  ${
          isEnding
            ? "border-red-600 bg-red-950"
            : "border-blue-800 bg-slate-900"
        }`}
      >
        {sidebarStatus && (
          <p className="text-center">
            {isEnding
              ? "La sesión está por expirar en:"
              : "La Sesión expirará en:"}
          </p>
        )}
        <strong>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </strong>
      </div>
    </div>
  );
};

const IdleCountdown = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
  const timeLeft = useIdleTimer();

  if (timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const isEnding = timeLeft <= 10_000;

  return (
    <div className="px-3 pb-4">
      <div
        className={`flex flex-col items-center justify-center py-3 border rounded-lg transition-all ${
          isEnding
            ? "border-red-700 bg-red-950"
            : "border-yellow-500 bg-yellow-950"
        }`}
      >
        {sidebarStatus && <p className="text-center">Inactividad detectada:</p>}
        <strong>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </strong>
        {sidebarStatus && !isEnding && (
          <span className="text-xs opacity-80">
            Interactúa para continuar
          </span>
        )}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();
  const [openItemLabel, setOpenItemLabel] = useState<string | null>("null");
  const [opened, setOpened] = useState<boolean>(false);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const location = useLocation();

  const menuSections: MenuSection[] = [
    {
      title: "",
      items: [],
    },
  ];

  useEffect(() => {
    let parentLabelToOpen: string | null = null;
    //Buscamos la ruta actual pertenece al un hijo
    for (const section of menuSections) {
      for (const item of section.items) {
        if (item.children) {
          const isChildActive = item.children.some(
            (child) => child.href === location.pathname
          );
          if (isChildActive) {
            parentLabelToOpen = item.label;
            break;
          }
        }
      }
      if (parentLabelToOpen) break;
    }
    setOpenItemLabel(parentLabelToOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleItemClick = (label: string) => {
    setOpenItemLabel((prevLabel) => (prevLabel === label ? null : label));
  };

  return (
    <aside
      className={`h-screen bg-slate-900 max-md:z-2000 text-blue-50 border border-blue-900 flex flex-col top-0 transition-all duration-300 ${
        sidebarStatus
          ? "md:w-64 max-md:left-0 sticky max-md:fixed"
          : "md:w-19 max-md:-left-55 max-md:fixed"
      }  z-1001`}
    >
      <div className="flex items-center">
        <div className="px-5 py-6 border-b border-blue-800 shrink-0 min-w-full w-full flex justify-center items-center">
          {!sidebarStatus && (
            <button
              className="cursor-pointer text-white"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <PanelLeftOpen />
            </button>
          )}

          {sidebarStatus && (
            <div className="w-full flex justify-between items-center gap-3 ">
              <Link to="/">
                <img src={logo_luwydyro_dark} alt="LogoTipo" className="h-7" />
              </Link>
              <button
                className="cursor-pointer text-white"
                onClick={() => setSidebarStatus(!sidebarStatus)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pt-5">
        <div className="px-3 pb-4">
          <div className="relative">
            <div
              className={`mb-1 min-w-16 border rounded-lg border-blue-800 overflow-hidden bg-slate-900 ${
                !sidebarStatus && "-translate-x-1.75"
              } transition-all duration-300 ease-in-out`}
            >
              <div
                className="flex cursor-pointer gap-3 py-2 px-3 text-blue-3000 hover:text-blue-100 transition-all duration-300 ease-in-out"
                onClick={() => setOpened((prevState) => !prevState)}
              >
                <img
                  src={perfil}
                  alt="Avatar"
                  className="bg-secondary-500/25 h-12 w-12 object-cover rounded-xl"
                />
                <div className="flex basis-full flex-wrap items-center truncate">
                  <div className="flex basis-full items-center gap-2 truncate text-sm ">
                    <span className="truncate ">Luwy Dyro</span>
                  </div>
                  <div className="basis-full truncate text-[0.688rem] first-letter:uppercase">
                    Admin
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {opened && (
                  <motion.div
                    key="user-menu"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto" },
                      collapsed: { height: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="px-3"
                  >
                    <div className="mb-2 list-none rounded-full border-b border-blue-700/50"></div>

                    <button
                      className={`flex cursor-pointer gap-2 w-full mb-1 items-center pt-2 pb-3 px-1 hover:text-blue-100 ${
                        !sidebarStatus && "justify-center"
                      }`}
                      onClick={() => onLogout()}
                    >
                      <Power height={17}></Power>
                      <div
                        className={`truncate overflow-hidden whitespace-nowrap text-sm ${
                          !sidebarStatus && "hidden"
                        }`}
                      >
                        Logout
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span
              className={`absolute end-0 top-0 -me-1 -mt-1 flex h-3 w-3 ${
                !sidebarStatus && "translate-x-1.5"
              }`}
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-200 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 pt-0 px-4 pb-20 overflow-auto no-scrollbar">
        <NavItem
          item={homeItem}
          isExpanded={sidebarStatus}
          isOpen={false}
          onClick={() => {}}
        ></NavItem>
                <NavItem
          item={homeItem2}
          isExpanded={sidebarStatus}
          isOpen={false}
          onClick={() => {}}
        ></NavItem>

        {menuSections.map((section) => (
          <div key={section.title}>
            <b
              className={`flex justify-center pt-4 pb-2 text-[0.625rem] font-bold uppercase text-blue-100
                  ${sidebarStatus ? "px-2 justify-start" : ""}
                
                `}
            >
              {sidebarStatus
                ? section.title
                : section.title.length > 4
                ? section.title.substring(0, 3) + "..."
                : section.title}
            </b>

            {section.items.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                isExpanded={sidebarStatus}
                isOpen={openItemLabel === item.label}
                onClick={() => {
                  handleItemClick(item.label);
                  setSidebarStatus(sidebarStatus);
                }}
              ></NavItem>
            ))}
          </div>
        ))}
      </nav>
      <IdleCountdown sidebarStatus={sidebarStatus}></IdleCountdown>
      <SessionCountdown sidebarStatus={sidebarStatus}></SessionCountdown>
    </aside>
  );
};

type NavItemProps = {
  item: MenuItem;
  isExpanded: boolean;
  isOpen: boolean;
  onClick: () => void;
};

const NavItem = ({ item, isExpanded, isOpen, onClick }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = item.href ? location.pathname === item.href : false;

  const handleClick = () => {
    if (item.onAction) {
      item.onAction();
    } else if (item.children) {
      onClick();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <>
      <div
        className={`flex text-sm items-center justify-between px-2 py-3 mb-2 cursor-pointer transition-colors duration-150
          ${
            isOpen || isActive
              ? "text-blue-100 font-semibold"
              : "hover:text-blue-100 "
          }
        `}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <item.icon className="h-6 w-6 shrink-0" />
          {isExpanded && <span className="ml-4 flex-1">{item.label}</span>}
        </div>
        {isExpanded && item.children && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {isOpen && isExpanded && item.children && (
        <div className="px-3 py-2 space-y-2">
          {item.children.map((child: MenuChild) => (
            <Link
              key={child.label}
              to={child.href || "#"}
              className={`flex text-sm min-h-8 hover:text-blue-100 m-0 justify-start items-center border-l border-blue-300 px-3
                    ${
                      location.pathname === child.href
                        ? "text-blue-50 font-semibold"
                        : "text-blue-400"
                    }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
