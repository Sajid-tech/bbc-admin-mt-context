import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import Layout from "../../layout/Layout";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CameraIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { FaWhatsapp } from "react-icons/fa";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function UserProfile() {
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
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProfileData(response.data.profile);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [isPanelUp, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/panel-update-profile`,
        userProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle successful update (e.g., show a success message)
    } catch (error) {
      console.error("Error updating profile", error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-100">
        <Card className="w-full mx-auto shadow-lg rounded-lg">
          <CardBody className="p-6">
            <div className="max-w-full mx-auto">
              <div>
                <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
              </div>
              <form onSubmit={handleSubmit} id="addIndiv" autoComplete="off">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {userProfileData.image ? (
                      <img
                        src={userProfileData.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="w-32 h-32 text-gray-300" />
                    )}
                    <label
                      htmlFor="image-upload"
                      className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                    >
                      <CameraIcon className="w-6 h-6 text-white" />
                    </label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    required
                    value={userProfileData.name}
                    onChange={handleInputChange}
                    label="Full Name"
                    icon={<UserCircleIcon className="h-5 w-5" />}
                  />
                  <Select
                    name="gender"
                    required
                    value={userProfileData.gender}
                    onChange={(value) =>
                      setUserProfileData((prevData) => ({
                        ...prevData,
                        gender: value,
                      }))
                    }
                    label="Gender"
                  >
                    {genderOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  <Input
                    name="dob"
                    required
                    type="date"
                    value={userProfileData.dob}
                    onChange={handleInputChange}
                    label="DOB"
                  />
                  <Input
                    name="email"
                    required
                    type="email"
                    value={userProfileData.email}
                    onChange={handleInputChange}
                    label="Email"
                    icon={<UserCircleIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="mobile"
                    required
                    value={userProfileData.mobile}
                    onChange={handleInputChange}
                    label="Mobile"
                    icon={<PhoneIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="whatsapp_number"
                    required
                    value={userProfileData.whatsapp_number}
                    onChange={handleInputChange}
                    label="WhatsApp"
                    icon={<FaWhatsapp className="h-5 w-5" />}
                  />
                  <Input
                    name="spouse_name"
                    value={userProfileData.spouse_name}
                    onChange={handleInputChange}
                    label="Spouse Name"
                    icon={<UserCircleIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="doa"
                    type="date"
                    value={userProfileData.doa}
                    onChange={handleInputChange}
                    label="Date of Anniversary"
                  />
                  <Input
                    name="company"
                    required
                    value={userProfileData.company}
                    onChange={handleInputChange}
                    label="Name of the Company"
                    icon={<BriefcaseIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="company_short"
                    required
                    value={userProfileData.company_short}
                    onChange={handleInputChange}
                    label="Company Short Name"
                    icon={<BriefcaseIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="category"
                    required
                    value={userProfileData.category}
                    onChange={handleInputChange}
                    label="Business Category"
                    icon={<BriefcaseIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="website"
                    value={userProfileData.website}
                    onChange={handleInputChange}
                    label="Website"
                    icon={<GlobeAltIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="experience"
                    value={userProfileData.experience}
                    onChange={handleInputChange}
                    label="Experience"
                    icon={<BriefcaseIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="landline"
                    value={userProfileData.landline}
                    onChange={handleInputChange}
                    label="Landline Number"
                    icon={<PhoneIcon className="h-5 w-5" />}
                  />
                  <Input
                    name="area"
                    required
                    value={userProfileData.area}
                    onChange={handleInputChange}
                    label="Area"
                    icon={<UserCircleIcon className="h-5 w-5" />}
                  />
                </div>

                <Input
                  name="address"
                  required
                  value={userProfileData.address}
                  onChange={handleInputChange}
                  label="Address"
                  icon={<UserCircleIcon className="h-5 w-5" />}
                  className="mt-6"
                />
                <Input
                  name="product"
                  required
                  value={userProfileData.product}
                  onChange={handleInputChange}
                  label="Products / Services"
                  icon={<BriefcaseIcon className="h-5 w-5" />}
                  className="mt-6"
                />
                <Input
                  name="profile_tag"
                  required
                  value={userProfileData.profile_tag}
                  onChange={handleInputChange}
                  label="Profile Tag"
                  icon={<UserCircleIcon className="h-5 w-5" />}
                  className="mt-6"
                />

                <CardFooter className="mt-6 flex justify-between">
                  <Button
                    type="submit"
                    color="light-blue"
                    className="w-full md:w-auto"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    type="button"
                    color="red"
                    className="w-full md:w-auto"
                    onClick={() => setUserProfileData({})}
                  >
                    Reset
                  </Button>
                </CardFooter>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
