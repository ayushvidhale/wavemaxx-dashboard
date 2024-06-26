// Sidebar.js

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import Link from "next/link";
import { IoSettings, IoNotificationsSharp } from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdNotificationsActive,
  MdSpaceDashboard,
} from "react-icons/md";
import { VscGithubAction } from "react-icons/vsc";
import { FcMoneyTransfer, FcFeedback } from "react-icons/fc";
import { RiLogoutBoxRFill, RiRemoteControlFill } from "react-icons/ri";
import { FcShare } from "react-icons/fc";
import { usePathname } from "next/navigation";
import { TiThList } from "react-icons/ti";

import { IoLogOut } from "react-icons/io5";
import {
  LuClipboardList,
  LuLayoutDashboard,
  LuSettings,
  LuShoppingCart,
  LuSquareDashedBottomCode,
  LuTruck,
} from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { useSession, signOut } from "next-auth/react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineGateway } from "react-icons/ai";
const SidebarContext = createContext();

export default function Sidebar({ isSidebarExpanded, user }) {
  const [expanded, setExpanded] = useState(false);
  const [toolsMenuExpanded, setToolsMenuExpanded] = useState(false);
  const { data: session, logout } = useSession();

  console.log(session);

  //const { logout } = useAuth0();
  // const logout = () => {
  //   console.log("logout");
  // };
  const location = usePathname();

  const isActive = (currentPath, path) => {
    if (
      currentPath === "/settings/profile" ||
      currentPath === "/settings/company" ||
      currentPath === "/settings/warehouse" ||
      currentPath === "/settings/channels" ||
      currentPath === "/settings/invoice" ||
      currentPath === "/settings/courier" ||
      currentPath === "/settings/label"
    ) {
      currentPath = "/settings";
    } else if (currentPath === "/admin" || currentPath === "/admin/create") {
      currentPath = "/admin";
    }
    return currentPath === path;
  };

  const clearExpanded = () => {
    setExpanded(false);
    setToolsMenuExpanded(false);
  };

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => clearExpanded()}
      className="h-[97%] fixed top-3 left-3 z-30 border-r rounded-lg bg-white border shadow-sm border-gray-200"
    >
      <nav className="h-full flex flex-col">
        <div className={`p-4  pb-4 flex ${expanded ? "" : "mx-auto"}`}>
          <div
            className={`w-full justify-start place-items-center space-x-2 ${
              expanded ? "flex" : "hidden"
            }`}
          >
            <img
              src="/marker/logo.png"
              className={`overflow-hidden object-cover  transition-all duration-200 rounded-lg ${
                expanded ? "w-full h-10" : "w-0 h-0"
              }`}
              alt=""
            />
          </div>
          <img
            src="/favicon.ico"
            alt=""
            className={`rounded-lg  object-cover ${
              expanded ? "w-0 h-0" : "w-8 h-8"
            }`}
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2">
            <Link
              href="/"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/")
                    ? " bg-indigo-200 text-gray-900"
                    : "hover:bg-indigo-200 text-gray-900"
                }
            `}
            >
              <MdSpaceDashboard className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Dashboard
              </span>
            </Link>

            <Link
              href="/gateway-devices"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/gateway-devices")
                    ? " bg-indigo-200 text-gray-900"
                    : "hover:bg-indigo-200 text-gray-900"
                }
            `}
            >
              <AiOutlineGateway className="w-6 h-6" />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Gateway Devices
              </span>
            </Link>

            <Link
              href="/remote-devices"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/remote-devices")
                    ? " bg-indigo-200 text-gray-900"
                    : "hover:bg-indigo-200 text-gray-900"
                }
            `}
            >
              <RiRemoteControlFill className="w-6 h-6" />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Remote Devices
              </span>
            </Link>

            <Link
              href="/system-logs"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/system-logs")
                    ? " bg-indigo-200 text-gray-900"
                    : "hover:bg-indigo-200 text-gray-900"
                }
            `}
            >
              <TiThList className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                System Logs
              </span>
            </Link>

            <Link
              href="/notifications"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/notifications")
                    ? " bg-indigo-200 text-gray-900"
                    : "hover:bg-indigo-200 text-gray-900"
                }
            `}
            >
              {/* Your custom SVG for Billing */}
              <MdNotificationsActive className="w-6 h-6" />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Notifications
              </span>
            </Link>
            {session?.user?.role === "superadmin" && (
              <>
                <hr className="border-t-2 border-gray-200" />

                <Link
                  href="/admin"
                  className={`
    relative flex items-center py-2 px-2 my-1
    font-medium rounded cursor-pointer
    transition-colors duration-200 group
    ${
      isActive(location, "/admin")
        ? " bg-indigo-200 text-gray-900"
        : "hover:bg-indigo-200 text-gray-900"
    }
`}
                >
                  <MdAdminPanelSettings className="w-6 h-6" />
                  <span
                    className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-200 ${
                      expanded ? "w-40 ml-3" : "w-0"
                    }`}
                  >
                    Super Admin
                  </span>
                </Link>
              </>
            )}
          </ul>
          {/* {expanded && (
            <div className="flex pb-4 px-2">
              <Input
                type="email"
                // label="Email"
                placeholder="Quick Search"
                size="sm"
                className="text-sm"
                labelPlacement="outside"
                startContent={
                  <FiSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                endContent={<Kbd keys={["command"]}>K</Kbd>}
              />
            </div>
          )} */}
        </SidebarContext.Provider>

        <hr className="border-t-2 border-gray-200 px-2" />

        <div className="flex p-2 mt-2">
          <img
            // onClick={() => setExpanded((curr) => !curr)}
            src={
              user?.picture ||
              "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais"
            }
            alt=""
            className={`
              w-10 h-10 rounded-lg border border-gray-300 ${
                expanded ? "ml-0" : "mx-auto"
              }
              
            `}
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-200 ${
                expanded ? "w-40 ml-2" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h1 className="font-bold text-gray-900 whitespace-nowrap text-sm ">
                {user?.name}
              </h1>
              <p
                className="text-[11px]
               text-gray-700  whitespace-nowrap "
              >
                {user?.role || "no role"}
              </p>
            </div>
            <IoLogOut
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
