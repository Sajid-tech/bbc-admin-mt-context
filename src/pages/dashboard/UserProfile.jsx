import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import {
  Input,
  MenuItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

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
        setUserProfileData(resposne.data);
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

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfileData({ ...userProfileData, [name]: value });
  };
  return (
    <Layout>
      <div className="flex mt-5 min-h-screen bg-gray-100">
        <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-lg">
          <CardBody className="p-6">
            <form id="addIndiv" autoComplete="off">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  name="name"
                  required
                  value={userProfileData?.profile?.name}
                  onChange={onInputChange}
                  label="Full Name"
                />
                <Select
                  name="gender"
                  required
                  value={userProfileData?.profile?.gender}
                  onChange={(e) =>
                    setUserProfileData.profile({
                      ...userProfileData.profile,
                      gender: e,
                    })
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
                  value={userProfileData?.profile?.dob}
                  onChange={onInputChange}
                  label="DOB"
                />
                <Input
                  name="image"
                  type="file"
                  onChange={(e) =>
                    setUserProfileData.profile({
                      ...userProfileData.profile,
                      image: e.target.files[0],
                    })
                  }
                  label="Profile Image"
                />
                <Input
                  name="email"
                  required
                  type="email"
                  value={userProfileData?.profile?.email}
                  onChange={onInputChange}
                  label="Email"
                />
                <Input
                  name="mobile"
                  required
                  value={userProfileData?.profile?.mobile}
                  onChange={onInputChange}
                  label="Mobile"
                />
                <Input
                  name="whatsapp_number"
                  required
                  value={userProfileData?.profile?.whatsapp_number}
                  onChange={onInputChange}
                  label="WhatsApp"
                />
                <Input
                  name="spouse_name"
                  value={userProfileData?.profile?.spouse_name}
                  onChange={onInputChange}
                  label="Spouse Name"
                />
                <Input
                  name="doa"
                  type="date"
                  value={userProfileData?.profile?.doa}
                  onChange={onInputChange}
                  label="Date of Anniversary"
                />
                <Input
                  name="company"
                  required
                  value={userProfileData?.profile?.company}
                  onChange={onInputChange}
                  label="Name of the Company"
                />
                <Input
                  name="company_short"
                  required
                  value={userProfileData?.profile?.company_short}
                  onChange={onInputChange}
                  label="Company Short Name"
                />
                <Input
                  name="category"
                  required
                  value={userProfileData?.profile?.category}
                  onChange={onInputChange}
                  label="Business Category"
                />
                <Input
                  name="website"
                  value={userProfileData?.profile?.website}
                  onChange={onInputChange}
                  label="Website"
                />
                <Input
                  name="experience"
                  value={userProfileData?.profile?.experience}
                  onChange={onInputChange}
                  label="Experience"
                />
                <Input
                  name="landline"
                  value={userProfileData?.profile?.landline}
                  onChange={onInputChange}
                  label="Landline Number"
                />
                <Input
                  name="area"
                  required
                  value={userProfileData?.profile?.area}
                  onChange={onInputChange}
                  label="Area"
                />
                <Input
                  name="address"
                  required
                  value={userProfileData?.profile?.address}
                  onChange={onInputChange}
                  label="Address"
                />
                <Input
                  name="product"
                  required
                  value={userProfileData?.profile?.product}
                  onChange={onInputChange}
                  label="Products / Services"
                  helperText="Type all Products or Services separated by a comma"
                />
                <Input
                  name="profile_tag"
                  required
                  value={userProfileData?.profile?.profile_tag}
                  onChange={onInputChange}
                  label="Profile Tag"
                  helperText="Enter Your Unique Profile Tag, e.g., Web Designer, Developer, etc."
                />
              </div>

              <CardFooter className="mt-6 flex justify-between">
                <Button
                  type="submit"
                  color="light-blue"
                  className="w-full md:w-auto"
                >
                  Submit
                </Button>
                <Button type="reset" color="red" className="w-full md:w-auto">
                  Reset
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
