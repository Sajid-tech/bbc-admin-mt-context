import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";

const Enquiry = () => {
  const [enquiryData, setEnquiryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

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
      name: "contact_name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "contact_email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "contact_mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "contact_message",
      label: "Message",
      options: {
        filter: true,
        sort: false,
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
    download: false,
    print: false,
  };

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-enquiry`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnquiryData(resposne.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiry();
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="mt-5 ">
        <MUIDataTable
          title={"Enquiry List"}
          data={enquiryData ? enquiryData?.enquiry : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default Enquiry;
