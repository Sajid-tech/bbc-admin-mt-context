import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangePassword from "./pages/profile/ChangePassword";
import UserProfile from "./pages/dashboard/UserProfile";
import About from "./pages/website/About";
import Enquiry from "./pages/website/Enquiry";
import NewUser from "./pages/users/NewUser";
import ActiveUser from "./pages/users/ActiveUser";
import InactiveUser from "./pages/users/InactiveUser";
import MobileUser from "./pages/users/MobileUser";
import ShareUser from "./pages/users/ShareUser";
import Download from "./pages/users/Download";
import Portfolio from "./pages/website/Portfolio";
import ShareUserById from "./pages/users/ShareUserById";
import NewUserView from "./pages/users/NewUserView";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />

        <Route
          path="/user-profile"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route
          path="/portfolio"
          element={<ProtectedRoute element={<Portfolio />} />}
        />
        <Route
          path="/enquiry"
          element={<ProtectedRoute element={<Enquiry />} />}
        />
        <Route
          path="/new-user"
          element={<ProtectedRoute element={<NewUser />} />}
        />
        <Route
          path="/user-view"
          element={<ProtectedRoute element={<NewUserView />} />}
        />
        <Route
          path="/active-user"
          element={<ProtectedRoute element={<ActiveUser />} />}
        />
        <Route
          path="/inactive-user"
          element={<ProtectedRoute element={<InactiveUser />} />}
        />
        <Route
          path="/mobile-user"
          element={<ProtectedRoute element={<MobileUser />} />}
        />
        <Route
          path="/share-user"
          element={<ProtectedRoute element={<ShareUser />} />}
        />
        <Route
          path="/share-view"
          element={<ProtectedRoute element={<ShareUserById />} />}
        />
        <Route
          path="/download"
          element={<ProtectedRoute element={<Download />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />

        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
    </>
  );
};

export default App;
