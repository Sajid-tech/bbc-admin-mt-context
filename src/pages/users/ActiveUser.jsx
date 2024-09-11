import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import Layout from "../../layout/Layout";
import { CiEdit } from "react-icons/ci";
import { TbExchange } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";

const ActiveUser = () => {
  const [activeUserData, setActiveUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const AdminType = localStorage.getItem("admin-type");

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-active-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setActiveUserData(response.data.active);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveUser();
    setLoading(false);
  }, []);

  const onUpdateActive = useCallback(async (userId) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/panel-update-active-profile/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User inactive successfully");
      setActiveUserData((prevData) =>
        prevData.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error updating active data", error);
      toast.error("Inactivate Err ");
    }
  }, []);

  const onUpdateUser = useCallback(async (userId) => {
    if (!userId) {
      alert("User id is missing");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/panel-update-details/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Hurray! you are became Gold user");
    } catch (error) {
      console.error("Error update on actiavte gold user");
      toast.error("Err while change the user to gold");
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "slNo",
        label: "SL No",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
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
          filter: false,
          sort: false,
          customBodyRender: (userId, tableMeta) => {
            const user = activeUserData[tableMeta.rowIndex];
            const detailsView = user ? user.details_view : null;
            return (
              <div className="flex items-center space-x-2">
                <CiEdit
                  title="Inactivate"
                  onClick={() => onUpdateActive(userId)}
                  className="h-5 w-5 cursor-pointer"
                />
                {detailsView === 0 && AdminType === "superadmin" && (
                  <TbExchange
                    title="changed to gold user"
                    onClick={() => onUpdateUser(userId)}
                    className="h-5 w-5 cursor-pointer"
                  />
                )}
              </div>
            );
          },
        },
      },
    ],
    [activeUserData, onUpdateActive]
  );

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

  const data = useMemo(
    () => (activeUserData ? activeUserData : []),
    [activeUserData]
  );

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

      <div className="mt-5">
        <MUIDataTable
          title={"Active User List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default ActiveUser;
