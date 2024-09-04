import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
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
  Avatar,
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

const NewUserView = () => {
  const [newUserData, setNewUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  //get user id fro th eurl

  const userId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    const fetchNewUserData = async () => {
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
        setNewUserData(response.data.new_user);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNewUserData();
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
    <div className="animate-pulse flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="rounded-full bg-slate-200 h-16 w-16"></div>
      <div className="flex-1 space-y-4">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <Card className="w-full">
          <CardHeader floated={false} className="h-80 m-0 relative">
            <div
              className="absolute inset-0 bg-center "
              style={{
                backgroundImage: `url(${
                  newUserData?.image
                    ? `https://businessboosters.club/public/images/user_images/${newUserData?.image}`
                    : "/placeholder-avatar.png"
                })`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <Typography variant="h2" className="mb-2 text-center">
                    {newUserData?.name}
                  </Typography>
                  <Typography variant="h4" className="text-center">
                    {newUserData?.company}
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
                      value={newUserData?.name}
                    />
                    <ProfileSection
                      icon={UserIcon}
                      title="Gender"
                      value={newUserData?.gender}
                    />
                    <ProfileSection
                      icon={CalendarIcon}
                      title="Date of Birth"
                      value={newUserData?.dob}
                    />
                    <ProfileSection
                      icon={UserIcon}
                      title="Spouse Name"
                      value={newUserData?.spouse_name}
                    />
                    <ProfileSection
                      icon={CalendarIcon}
                      title="Anniversary"
                      value={newUserData?.anniversary}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="business">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileSection
                      icon={BriefcaseIcon}
                      title="Company"
                      value={newUserData?.company}
                    />
                    <ProfileSection
                      icon={BriefcaseIcon}
                      title="Company Short Name"
                      value={newUserData?.company_short}
                    />
                    <ProfileSection
                      icon={BriefcaseIcon}
                      title="Business Category"
                      value={newUserData?.category}
                    />
                    <ProfileSection
                      icon={GlobeAltIcon}
                      title="Website"
                      value={newUserData?.website}
                    />
                    <ProfileSection
                      icon={BriefcaseIcon}
                      title="Experience"
                      value={newUserData?.experience}
                    />
                    <ProfileSection
                      icon={BriefcaseIcon}
                      title="Products / Services"
                      value={newUserData?.product}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="contact">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileSection
                      icon={EnvelopeIcon}
                      title="Email"
                      value={newUserData?.email}
                    />
                    <ProfileSection
                      icon={PhoneIcon}
                      title="Mobile"
                      value={newUserData?.mobile}
                    />
                    <ProfileSection
                      icon={PhoneIcon}
                      title="WhatsApp"
                      value={newUserData?.whatsapp_number}
                    />
                    <ProfileSection
                      icon={PhoneIcon}
                      title="Landline"
                      value={newUserData?.landline}
                    />
                    <ProfileSection
                      icon={MapPinIcon}
                      title="Area"
                      value={newUserData?.area}
                    />
                    <ProfileSection
                      icon={MapPinIcon}
                      title="Address"
                      value={newUserData?.address}
                    />
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default NewUserView;
