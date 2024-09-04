import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";

const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        {children}
        {/* <div className="text-blue-gray-600 ">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Layout;

// className="min-h-screen"
//       style={{
//         backgroundColor: "#e5e5f7",
//         opacity: 1,
//         backgroundImage: "radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)",
//         backgroundSize: "10px 10px",
//       }}
