import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";

function OutstandingShow() {
  const [Notifydata, notificationData] = useState([]);
  const [filteroutdata, OutstandingFilter] = useState([]);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/Outstanding/notification`)
      .then((response) => {
        const resData = response.data;
        notificationData(resData.data);
        OutstandingFilter(resData.data);
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
      width: "200px",
    },
    {
      name: "Client Type",
      selector: (row) => row.type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Clientcode",
      selector: (row) => row.clientcode,
      width: "120px",
      sortable: true,
    },
    {
      name: "Financial Year",
      selector: (row) => row.financialyear,
      sortable: true,
      width: "150px",
    },
    {
      name: "Project Value",
      selector: (row) => row.projectvalue,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
      sortable: true,
      width: "100px",
    },
    {
      name: "Pending",
      selector: (row) => row.TotalAMCoutstanding,
      sortable: true,
      width: "120px",
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
  function filterdata(event) {
    var value = event.target.value;

    const keys = ["name", "type", "projectvalue", "paid", "clientcode"];

    const filter = filteroutdata?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    notificationData(filter);
  }
  const exportcongregationTable = () => {
    axios
      .get(`${ApiUrl}/Religio/Outstanding/export`)
      .then((response) => {
        // Trigger file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "congregation_data.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Export error:", error);
      });
  };
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>
          Total Outstanding
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <input
                    id="myInput"
                    type="text"
                    onChange={filterdata}
                    className="form-control Province"
                    placeholder="Search.."
                  />
                </div>

                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {/* &nbsp;&nbsp;&nbsp;
                  <label onClick={exportcongregationTable}>
                    <i
                      class="fa-solid fa-file-csv"
                      style={{ color: "black", cursor: "pointer" }}></i>
                  </label> */}
                </div>
              </div>
              <br></br>
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

export default OutstandingShow;
