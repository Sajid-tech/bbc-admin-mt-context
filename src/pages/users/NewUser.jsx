import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { CiEdit } from "react-icons/ci";

const NewUser = () => {
  const [newUserData, setNewUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewUser = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-new-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewUserData(resposne.data);
        // console.log("setnewuserdata", resposne.data);
      } catch (error) {
        console.error("Error fetching newUserData", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewUser();
    setLoading(false);
  }, []);

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
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "area",
      label: "Area",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "referral_code",
      label: "Referral Code",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (userId) => {
          return (
            <div onClick={() => navigate(`/user-view?id=${userId}`)}>
              <CiEdit className="h-5 w-5 cursor-pointer" />
            </div>
          );
        },
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

  // console.log("newuserdata", newUserData);

  return (
    <Layout>
      <div className="mt-5 ">
        <MUIDataTable
          title={"New User List"}
          data={newUserData ? newUserData?.new_user : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default NewUser;
