import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  InformationCircleIcon,
  ShareIcon,
  UserCircleIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";

const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

  const adminType = localStorage.getItem("admin-type");
  const detailsView = localStorage.getItem("details-view");

  // Hardcoded sidenavType to "dark"
  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-blue-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // close sidebar when clicking outside

  useEffect(() => {
    function handClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handClickOutside);
    return () => {
      document.removeEventListener("mousedown", handClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);

  // defne the menu item as per role

  const menuItems = [
    {
      to: "/home",
      icon: <HomeIcon className="w-5 h-5 text-inherit" />,
      text: "Dashboard",
      roles: ["admin", "superadmin", "user", "userType1"],
    },
    {
      to: "/user-profile",
      icon: <UserCircleIcon className="w-5 h-5 text-inherit" />,
      text: "Profile",
      roles: ["admin", "superadmin", "user", "userType1"],
    },
    {
      to: "/about",
      icon: <InformationCircleIcon className="w-5 h-5 text-inherit" />,
      text: "About Us",
      roles: ["admin", "superadmin", "userType1"],
    },
    {
      to: "/portfolio",
      icon: <BriefcaseIcon className="w-5 h-5 text-inherit" />,
      text: "Portfolio",
      roles: ["admin", "superadmin", "userType1"],
    },
    {
      to: "/enquiry",
      icon: <ChatBubbleLeftIcon className="w-5 h-5 text-inherit" />,
      text: "Enquiry",
      roles: ["admin", "superadmin", "userType1"],
    },
    {
      to: "/new-user",
      icon: <UserPlusIcon className="w-5 h-5 text-inherit" />,
      text: "New User",
      roles: ["admin", "superadmin"],
    },
    {
      to: "/active-user",
      icon: <UserIcon className="w-5 h-5 text-inherit" />,
      text: "Active User",
      roles: ["admin", "superadmin"],
    },
    {
      to: "/inactive-user",
      icon: <UserMinusIcon className="w-5 h-5 text-inherit" />,
      text: "Inactive User",
      roles: ["admin", "superadmin"],
    },
    {
      to: "/mobile-user",
      icon: <DevicePhoneMobileIcon className="w-5 h-5 text-inherit" />,
      text: "Mobile User",
      roles: ["admin", "superadmin"],
    },
    {
      to: "/share-user",
      icon: <ShareIcon className="w-5 h-5 text-inherit" />,
      text: "Share User",
      roles: ["admin", "superadmin"],
    },
    {
      to: "/download",
      icon: <ArrowDownTrayIcon className="w-5 h-5 text-inherit" />,
      text: "Download",
      roles: ["admin", "superadmin"],
    },
  ];

  // role-type

  const getFilteredMenuItems = () => {
    if (adminType === "admin" || adminType == "superadmin") {
      return menuItems;
    }
    if (adminType === "user") {
      return detailsView === "0"
        ? menuItems.filter((item) => item.roles.includes("user"))
        : menuItems.filter((item) => item.roles.includes("userType1"));
    }
  };

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative bg-white rounded-xl`}>
        <Link to="/home" className="flex items-center justify-center p-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col  gap-[6px]">
          {getFilteredMenuItems().map((item) => (
            <li key={item.to}>
              <NavLink to={item.to}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color="white"
                    className="flex items-center gap-4 px-4 py-2 text-sm md:text-base capitalize"
                    fullWidth
                  >
                    {item.icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {item.text}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}

          {/* Add more hardcoded routes here as needed */}
        </ul>
      </div>
    </aside>
  );
};
export default SideNav;
