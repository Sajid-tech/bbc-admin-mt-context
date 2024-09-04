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
    <div className="flex items-center space-x-2 mb-2">
      <Icon className="w-5 h-5 text-blue-500" />
      <Typography variant="h6" color="blue-gray">
        {title}:
      </Typography>
      <Typography>{value || "N/A"}</Typography>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-slate-200 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader floated={false} className="h-80">
            <div className="flex items-center space-x-4 m-4">
              <Avatar
                size="xxl"
                alt="User Avatar"
                src={
                  `https://businessboosters.club/public/images/user_images/${newUserData?.image}` ||
                  "/placeholder-avatar.png"
                }
                className="border border-blue-500 shadow-xl shadow-blue-900/20 ring-4 ring-blue-500/30"
              />
              <div>
                <Typography variant="h4" color="blue-gray" className="mb-1">
                  {loading ? <LoadingSkeleton /> : newUserData?.name}
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="font-normal"
                >
                  {loading ? <LoadingSkeleton /> : newUserData?.company}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs value="personal">
              <TabsHeader>
                <Tab value="personal">Personal Info</Tab>
                <Tab value="business">Business Info</Tab>
                <Tab value="contact">Contact Info</Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="personal">
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
                </TabPanel>
                <TabPanel value="business">
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
                </TabPanel>
                <TabPanel value="contact">
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
