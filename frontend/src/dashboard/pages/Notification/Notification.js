import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";

function NotificationShow() {
  const [Notifydata, notificationData] = useState([]);
  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/Balance/notification`)
      .then((response) => {
        const resData = response.data;
        notificationData(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Client Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "AMC Date",
      selector: (row) => row.amcdate,
      sortable: true,
    },
    {
      name: "Month",
      selector: (row) => row.Month,
      sortable: true,
    },
    {
      name: "AMC Value",
      selector: (row) => row.AMC,
      sortable: true,
    },
    {
      name: "AMC Balance",
      selector: (row) => row.TotalAMCoutstanding,
      sortable: true,
    },
    // {
    //   name: "Outstanding",
    //   selector: (row) => row.TotalProjectoutstandingGST,
    //   sortable: true,
    // },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
        backgroundColor: "#fafafa",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    pagination: {
      style: {
        fontWeight: "700",
        color: "black",
      },
    },
  };

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Upcoming AMC Clients
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                columns={columns}
                data={Notifydata}
                pagination
                keyField={(row) => row.id} // Replace "id" with the actual key field in your data
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationShow;
