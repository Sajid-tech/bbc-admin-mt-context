import React, { useContext, useEffect, useState } from "react";
import { ContextPanel } from "../../utils/ContextPanel";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { UserIcon, UserMinusIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async (retryCount = 0) => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/panel-dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < 5) {
          // Exponential backoff, retry after increasing delays
          const delay = Math.pow(2, retryCount) * 1000; // 1000ms, 2000ms, 4000ms, etc.
          setTimeout(() => fetchDashboard(retryCount + 1), delay);
        } else {
          console.error("Error fetching dashboard data", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [isPanelUp, navigate]);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        <Card className="bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg w-full md:w-1/3">
          <CardBody className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <UserIcon className="w-12 h-12 text-blue-500" />
              <div>
                <Typography variant="h6" color="white" className="uppercase">
                  Active Users
                </Typography>
                <Typography variant="h4" color="white">
                  {dashboardData?.total_active || 0}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg w-full md:w-1/3">
          <CardBody className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <UserMinusIcon className="w-12 h-12 text-red-500" />
              <div>
                <Typography variant="h6" color="white" className="uppercase">
                  Inactive Users
                </Typography>
                <Typography variant="h4" color="white">
                  {dashboardData?.total_inactive || 0}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
