import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const About = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [id, setId] = useState(null);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-about-us`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAbout(resposne.data.aboutUs);
        setId(resposne.data.aboutUs.id);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
    setLoading(false);
  }, []);

  const handleUpdateAbout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${BASE_URL}/api/panel-update-about-us/${id}`,
        { product_about_us: about.product_about_us },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("update succesfull");
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const handleInputChange = (e) => {
    setAbout({ ...about, product_about_us: e.target.value });
    setIsUpdated(true);
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">About Us</h1>
          <textarea
            value={about?.product_about_us || ""}
            onChange={handleInputChange}
            className="w-full h-60 p-4 border border-gray-300 rounded-lg resize-none"
          />
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleUpdateAbout}
              disabled={!isUpdated}
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                !isUpdated ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Update
            </button>
            <button
              onClick={() => navigate("/home")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
