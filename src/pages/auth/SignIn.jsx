import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);

    //create a formData object and append state values
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);

      if (res.status === 200) {
        const token = res.data.UserInfo?.token;
        const adminType = res.data.UserInfo?.user?.admin_type;
        const detailsView = res.data.UserInfo?.user?.details_view;
        const UserName = res.data.UserInfo?.user?.mobile;
        if (token) {
          // Store the token in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("admin-type", adminType);
          localStorage.setItem("details-view", detailsView);
          localStorage.setItem("username", UserName);
          navigate("/home");
          toast.success("Login Succesfully");
        } else {
          toast.error("Login Failed, credentials doesn't match");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <section className="flex flex-col lg:flex-row min-h-screen items-center ">
        <div className="flex-1 lg:w-3/5 m-4 lg:m-12  px-4 lg:px-8">
          <div className="relative mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4 bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-300 shadow-red-300">
            <div className="text-center">
              <Link to="/" className="flex items-center justify-center p-4">
                <img src="logo.png" alt="Logo" className={`h-12 w-auto    `} />
              </Link>
            </div>
            <form
              onSubmit={handleSumbit}
              method="POST"
              className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
            >
              <div className="mb-6 flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Mobile No
                </Typography>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  placeholder="Mobile No"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Password
                </Typography>
                <Input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <Button
                type="sumbit"
                disabled={loading}
                className="mt-6"
                fullWidth
              >
                {loading ? "Checking..." : "Sign In"}
              </Button>

              <div className="flex items-center justify-between gap-2 mt-6">
                <Typography
                  variant="small"
                  className="text-center text-blue-gray-500 font-medium "
                >
                  Not registered?
                  <Link
                    target="blank"
                    to="https://businessboosters.club/register"
                    className="text-gray-900 ml-1"
                  >
                    Create account
                  </Link>
                </Typography>
                <Typography
                  variant="small"
                  className="font-medium text-gray-900"
                >
                  <Link to="/forget-password">Forgot Password</Link>
                </Typography>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-auto lg:h-full hidden  lg:block">
          <img
            src="/img/pattern.png"
            className="h-full max-h-screen w-full object-cover  rounded-none"
            alt="Sign In Background"
          />
        </div>
      </section>
    </>
  );
};

export default SignIn;
