import {
  ChevronDownIcon,
  HomeIcon,
  UserCircleIcon,
  UserPlusIcon,
  UserIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline"; // Add necessary icons here

import { useState } from "react"; // Add useState hook for menu toggling
import { Button, Typography } from "@material-tailwind/react"; // Import Material Tailwind UI components
import { MdOutlineAdd, MdToday } from "react-icons/md"; // Example icons

const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const [openUsersMenu, setOpenUsersMenu] = useState(false); // State to handle dropdown toggle

  const handleUsersButtonClick = () => {
    setOpenUsersMenu(!openUsersMenu); // Toggle dropdown on click
  };

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
    // Other menu items...
  ];

  const getFilteredMenuItems = () => {
    // Filtering logic remains the same...
  };

  return (
    <aside
      className={`${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="m-4 overflow-y-auto">
        <ul className="mb-4 flex flex-col gap-1">
          {/* Other non-users items */}
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

          {/* Users Dropdown */}
          <li>
            <div>
              <Button
                variant="text"
                color="white"
                className="flex items-center justify-between px-4 capitalize"
                fullWidth
                onClick={handleUsersButtonClick}
              >
                <div className="flex items-center gap-4">
                  <UserPlusIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Users
                  </Typography>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    openUsersMenu ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {openUsersMenu && (
                <ul className="ml-8">
                  {/* New User */}
                  <li>
                    <NavLink to="/new-user">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="white"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          <UserPlusIcon className="w-5 h-5 text-inherit" />
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            New User
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  {/* Active User */}
                  <li>
                    <NavLink to="/active-user">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="white"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          <UserIcon className="w-5 h-5 text-inherit" />
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            Active User
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  {/* Inactive User */}
                  <li>
                    <NavLink to="/inactive-user">
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color="white"
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          <UserMinusIcon className="w-5 h-5 text-inherit" />
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            Inactive User
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
