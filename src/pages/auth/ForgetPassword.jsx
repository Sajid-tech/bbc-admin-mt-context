import { Input, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";

const ForgetPassword = () => {
  const [phone, setPhone] = useState("");
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
    formData.append("phone", phone);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(
        `${BASE_URL}/api/panel-send-password`,
        formData
      );

      if (res.status === 200) {
        toast.success("Password reset Succesfully");
        navigate("/");
      } else {
        toast.error("password reset, Err");
      }
    } catch (error) {
      console.error("An err occured during Forget Passoword", error);
      toast.error("An err occured during Forget Passoword");
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

      <section className="flex flex-col lg:flex-row min-h-screen items-center justify-center  bg-gray-200">
        <div className="flex-1 lg:w-3/5 m-4 lg:m-12 px-4 lg:px-8">
          <div className="relative mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4 bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-300 shadow-red-300">
            <div className="text-center">
              <Link to="/" className="flex items-center justify-center p-4">
                <img src="logo.png" alt="Logo" className={`h-12 w-auto    `} />
              </Link>
            </div>
            <form className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4">
              <div className="mb-6 flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Mobile No
                </Typography>
                <Input
                  name="phone"
                  size="lg"
                  placeholder="name@mail.com"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button
                type="submit"
                onClick={handleSumbit}
                className="mt-6"
                fullWidth
              >
                Reset Password
              </Button>

              <Typography
                variant="paragraph"
                className="text-center text-blue-gray-500 font-medium mt-4"
              >
                Remembered your password?
                <Link to="/" className="text-gray-900 ml-1">
                  Sign In
                </Link>
              </Typography>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-auto lg:h-full hidden  lg:block">
          <img
            src="/img/pattern.png"
            className="h-full max-h-screen w-full object-cover rounded-none"
            alt="Forget Password Background"
          />
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
