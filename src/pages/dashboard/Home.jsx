import React, { useContext, useEffect, useState } from "react";
import { ContextPanel } from "../../utils/ContextPanel";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const Home = () => {
  // fetching dashboard api
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(`${BASE_URL}/api/panel-dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(resposne.data);
      } catch {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="flex lg:flex-row md:flex-row flex-col m-5 p-5 gap-5">
        <article className="flex  mt-4 bg-blue-100 transition hover:shadow-xl">
          <div className=" rotate-180 p-2 [writing-mode:_vertical-lr]  bg-green-100 ">
            <time
              dateTime="10-10-2022"
              className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
            >
              <span>10-10-2022 </span>
              <span className="w-px flex-1 bg-gray-900/10"></span>
              <span className=" text-red-700">Monday</span>
            </time>
          </div>

          <div className="flex flex-1  flex-col justify-between">
            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <Link href="#">
                <h3 className="font-bold uppercase text-xl text-gray-900">
                  Active user
                </h3>
              </Link>

              <p className="mt-2 line-clamp-5 lg:line-clamp-6 text-sm/relaxed text-gray-700">
                {dashboardData?.total_active}
              </p>
            </div>
          </div>
        </article>
        <article className="flex mt-4 bg-blue-100 transition hover:shadow-xl">
          <div className=" rotate-180 p-2 [writing-mode:_vertical-lr]  bg-green-100 ">
            <time
              dateTime="10-10-2022"
              className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
            >
              <span>10-10-2022 </span>
              <span className="w-px flex-1 bg-gray-900/10"></span>
              <span className=" text-red-700">Monday</span>
            </time>
          </div>

          <div className="flex flex-1  flex-col justify-between">
            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <Link href="#">
                <h3 className="font-bold uppercase text-xl text-gray-900">
                  Inactive user
                </h3>
              </Link>

              <p className="mt-2 line-clamp-5 lg:line-clamp-6 text-sm/relaxed text-gray-700">
                {dashboardData?.total_inactive}
              </p>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Home;
