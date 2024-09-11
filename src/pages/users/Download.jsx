import React from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

import toast, { Toaster } from "react-hot-toast";

const Download = () => {
  //use toaster
  //logic
  // create a function called download report for download logic (for resuable)
  // get  token from localStorage.
  // than post request with token with axios
  // Set responseType-"blob" to handle binary data for download.
  // Created a download link using window.URL.createObjectURL.
  // use the download link in onClick
  const downloadReport = async (url, fileName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      console.log(`${fileName} downloaded successfully.`);
      // toast.success("Member data Download");
    } catch (err) {
      console.error(`Error downloading ${fileName}:`, err);
      toast.error("Err on Downloading");
    }
  };

  const downloadMemberData = (e) => {
    e.preventDefault();
    downloadReport(`${BASE_URL}/api/download-member-report`, "member.csv");
    toast.success("Member data Download");
  };

  const downloadMobileUserData = (e) => {
    e.preventDefault();
    downloadReport(
      `${BASE_URL}/api/download-mobile-user-report`,
      "mobileuser.csv"
    );
    toast.success("Mobile User data Download");
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

      <div className="container mx-auto mt-10 px-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-lg shadow-xl text-white">
          <h3 className="text-3xl font-extrabold mb-6 text-center">
            Download Data
          </h3>
          <hr className="mb-8 border-indigo-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              className="w-full bg-white text-indigo-700 font-semibold py-4 rounded-xl hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg"
              onClick={downloadMemberData}
            >
              Download Member Data
            </button>
            <button
              className="w-full bg-white text-indigo-700 font-semibold py-4 rounded-xl hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg"
              onClick={downloadMobileUserData}
            >
              Download Mobile User Data
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Download;
