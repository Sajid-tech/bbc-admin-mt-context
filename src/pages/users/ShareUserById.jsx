import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const ShareUserById = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Get user ID from the URL
  const userId = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-share-by-id/${userId}`,
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

  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: false,
  };

  return (
    <Layout>
      <div className="mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MUIDataTable
            title={"User Share Details"}
            data={userData ? userData : []}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </Layout>
  );
};

export default ShareUserById;
