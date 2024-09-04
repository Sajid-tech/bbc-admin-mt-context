import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const BASE_URL = "your-base-url-here"; // Replace with your actual base URL

const EnhancedUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-profile-by-id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.new_user);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const ProfileSection = ({ icon: Icon, title, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-4">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <Typography variant="h6" color="blue-gray" className="font-medium">
          {title}:
        </Typography>
      </div>
      <Typography className="text-gray-700">{value || "N/A"}</Typography>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader
          floated={false}
          className="h-60 sm:h-80 md:h-96 m-0 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${
                userData?.image
                  ? `https://businessboosters.club/public/images/user_images/${userData.image}`
                  : "/placeholder-avatar.png"
              })`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end sm:justify-center items-center text-white p-4">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <Typography
                  variant="h3"
                  className="mb-2 text-center text-shadow"
                >
                  {userData?.name}
                </Typography>
                <Typography variant="h6" className="text-center text-shadow">
                  {userData?.company}
                </Typography>
              </>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <Tabs value="personal" className="w-full">
            <TabsHeader className="w-full overflow-x-auto flex-nowrap">
              <Tab value="personal" className="w-full sm:w-auto">
                Personal Info
              </Tab>
              <Tab value="business" className="w-full sm:w-auto">
                Business Info
              </Tab>
              <Tab value="contact" className="w-full sm:w-auto">
                Contact Info
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="personal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileSection
                    icon={UserIcon}
                    title="Full Name"
                    value={userData?.name}
                  />
                  <ProfileSection
                    icon={UserIcon}
                    title="Gender"
                    value={userData?.gender}
                  />
                  <ProfileSection
                    icon={CalendarIcon}
                    title="Date of Birth"
                    value={userData?.dob}
                  />
                  <ProfileSection
                    icon={UserIcon}
                    title="Spouse Name"
                    value={userData?.spouse_name}
                  />
                  <ProfileSection
                    icon={CalendarIcon}
                    title="Anniversary"
                    value={userData?.anniversary}
                  />
                </div>
              </TabPanel>
              <TabPanel value="business">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileSection
                    icon={BriefcaseIcon}
                    title="Company"
                    value={userData?.company}
                  />
                  <ProfileSection
                    icon={BriefcaseIcon}
                    title="Company Short Name"
                    value={userData?.company_short}
                  />
                  <ProfileSection
                    icon={BriefcaseIcon}
                    title="Business Category"
                    value={userData?.category}
                  />
                  <ProfileSection
                    icon={GlobeAltIcon}
                    title="Website"
                    value={userData?.website}
                  />
                  <ProfileSection
                    icon={BriefcaseIcon}
                    title="Experience"
                    value={userData?.experience}
                  />
                  <ProfileSection
                    icon={BriefcaseIcon}
                    title="Products / Services"
                    value={userData?.product}
                  />
                </div>
              </TabPanel>
              <TabPanel value="contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileSection
                    icon={EnvelopeIcon}
                    title="Email"
                    value={userData?.email}
                  />
                  <ProfileSection
                    icon={PhoneIcon}
                    title="Mobile"
                    value={userData?.mobile}
                  />
                  <ProfileSection
                    icon={PhoneIcon}
                    title="WhatsApp"
                    value={userData?.whatsapp_number}
                  />
                  <ProfileSection
                    icon={PhoneIcon}
                    title="Landline"
                    value={userData?.landline}
                  />
                  <ProfileSection
                    icon={MapPinIcon}
                    title="Area"
                    value={userData?.area}
                  />
                  <ProfileSection
                    icon={MapPinIcon}
                    title="Address"
                    value={userData?.address}
                  />
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default EnhancedUserProfile;
