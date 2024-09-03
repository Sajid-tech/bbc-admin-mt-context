import React from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

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
    } catch (err) {
      console.error(`Error downloading ${fileName}:`, err);
    }
  };

  const downloadMemberData = (e) => {
    e.preventDefault();
    downloadReport(`${BASE_URL}/api/download-member-report`, "member.csv");
  };

  const downloadMobileUserData = (e) => {
    e.preventDefault();
    downloadReport(
      `${BASE_URL}/api/download-mobile-user-report`,
      "mobileuser.csv"
    );
  };

  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Downloads</h3>
          <hr className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              onClick={downloadMemberData}
            >
              Download Member
            </button>
            <button
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              onClick={downloadMobileUserData}
            >
              Download Mobile User
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Download;
