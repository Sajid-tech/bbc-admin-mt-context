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
import Layout from "../../layout/Layout";
import MUIDataTable from "mui-datatables";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

const InactiveUser = () => {
  const [inActiveUserData, setInActiveUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInActiveUser = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-inactive-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInActiveUserData(resposne?.data?.inactive);
      } catch (error) {
        console.error("Error fetching inactive data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInActiveUser();
    setLoading(false);
  }, []);

  const onUpdateInActive = useCallback(async (userId) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/panel-update-inactive-profile/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User became active");
      setInActiveUserData((prevData) =>
        prevData.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error updating inactive update data", error);
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
              <div>
                <CiEdit
                  title="Activate"
                  onClick={() => onUpdateInActive(userId)}
                  className="h-5 w-5 cursor-pointer"
                />
              </div>
            );
          },
        },
      },
    ],
    [inActiveUserData, onUpdateInActive]
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
    () => (inActiveUserData ? inActiveUserData : []),
    [inActiveUserData]
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

      <div className="mt-5 ">
        <MUIDataTable
          title={"InActive User List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default InactiveUser;
