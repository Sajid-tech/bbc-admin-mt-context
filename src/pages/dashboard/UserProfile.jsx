import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import toast, { Toaster } from "react-hot-toast";

import {
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  Option,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CameraIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { FaTag, FaWhatsapp } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiMapPinAreaFill } from "react-icons/pi";
import { CiLocationOn, CiShoppingTag } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

const UserProfile = () => {
  const [userProfileData, setUserProfileData] = useState({
    name: "",
    gender: "",
    dob: "",
    image: null,
    email: "",
    mobile: "",
    whatsapp_number: "",
    spouse_name: "",
    doa: "",
    company: "",
    company_short: "",
    category: "",
    website: "",
    experience: "",
    landline: "",
    area: "",
    address: "",
    product: "",
    profile_tag: "",
  });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProfileData(resposne.data.profile);
        setId(resposne.data.profile.id);
        console.log(resposne.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
    setLoading(false);
  }, []);
  console.log("testing userprofile data", userProfileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfileData({ ...userProfileData, [name]: value });
  };

  // update handle

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/panel-update-profile/${id}`,
        userProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile Updated");
    } catch (error) {
      console.error("Error updating profille", error);
      toast.error("Profile Updated err");
    } finally {
      setLoading(false);
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <Layout>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "white",
              marginTop: "48px",
              padding: "12px",
            },
          },
          error: {
            style: {
              background: "red",
              marginTop: "48px",
              padding: "12px",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 mt-2">
        <div className="relative py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Card className="bg-white shadow-lg rounded-lg ">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              <form
                onSubmit={handleSumbit}
                id="addIndiv"
                autoComplete="off"
                className="space-y-6"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {userProfileData?.image ? (
                      <img
                        src={`https://businessboosters.club/public/images/user_images/${userProfileData?.image}`}
                        alt="Profile"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-4 border-blue-500"
                      />
                    ) : (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 flex items-center justify-center rounded-lg border-4 border-blue-500">
                        <UserCircleIcon className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" />
                      </div>
                    )}
                    {/* <label
                      htmlFor="image-upload"
                      className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                      <CameraIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </label> */}
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setUserProfileData((prevData) => ({
                          ...prevData,
                          image: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Input
                      name="name"
                      required
                      value={userProfileData.name}
                      onChange={handleInputChange}
                      label="Full Name"
                      icon={<UserCircleIcon className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="gender"
                      required
                      value={userProfileData.gender}
                      onChange={handleInputChange}
                      label="Gender"
                      icon={<BiMaleFemale className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="dob"
                      required
                      type="date"
                      value={userProfileData.dob}
                      onChange={handleInputChange}
                      label="DOB"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      required
                      type="email"
                      value={userProfileData.email}
                      onChange={handleInputChange}
                      label="Email"
                      icon={<MdEmail className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="mobile"
                      required
                      value={userProfileData.mobile}
                      onChange={handleInputChange}
                      label="Mobile"
                      icon={<PhoneIcon className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="whatsapp_number"
                      required
                      value={userProfileData.whatsapp_number}
                      onChange={handleInputChange}
                      label="WhatsApp"
                      icon={<FaWhatsapp className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="spouse_name"
                      value={userProfileData.spouse_name}
                      onChange={handleInputChange}
                      label="Spouse Name"
                      icon={<UserCircleIcon className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="doa"
                      type="date"
                      value={userProfileData.doa}
                      onChange={handleInputChange}
                      label="Date of Anniversary"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="company"
                      required
                      value={userProfileData.company}
                      onChange={handleInputChange}
                      label="Name of the Company"
                      icon={<BriefcaseIcon className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="company_short"
                      required
                      value={userProfileData.company_short}
                      onChange={handleInputChange}
                      label="Company Short Name"
                      icon={<BriefcaseIcon className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Input
                      name="category"
                      required
                      value={userProfileData.category}
                      onChange={handleInputChange}
                      label="Business Category"
                      icon={<BriefcaseIcon className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Input
                      name="website"
                      value={userProfileData.website}
                      onChange={handleInputChange}
                      label="Website"
                      icon={<GlobeAltIcon className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="experience"
                      value={userProfileData.experience}
                      onChange={handleInputChange}
                      label="Experience"
                      icon={<BriefcaseIcon className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="landline"
                      value={userProfileData.landline}
                      onChange={handleInputChange}
                      label="Landline Number"
                      icon={<PhoneIcon className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      name="area"
                      required
                      value={userProfileData.area}
                      onChange={handleInputChange}
                      label="Area"
                      icon={<PiMapPinAreaFill className="h-5 w-5" />}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Input
                      name="address"
                      required
                      value={userProfileData.address}
                      onChange={handleInputChange}
                      label="Address"
                      icon={<FaLocationDot className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Input
                      name="product"
                      required
                      value={userProfileData.product}
                      onChange={handleInputChange}
                      label="Products / Services"
                      icon={<BriefcaseIcon className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Input
                      name="profile_tag"
                      required
                      value={userProfileData.profile_tag}
                      onChange={handleInputChange}
                      label="Profile Tag"
                      icon={<FaTag className="h-4 w-4" />}
                      className="w-full"
                    />
                  </div>
                </div>

                <CardFooter className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    type="submit"
                    color="blue"
                    className="w-full sm:w-auto"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    type="button"
                    color="red"
                    className="w-full sm:w-auto"
                    onClick={handleHome}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
