import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";

function NotificationShow() {
  const [Notifydata, notificationData] = useState([]);
  const [filteroutdata, OutstandingFilter] = useState([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/Balance/notification`)
      .then((response) => {
        const resData = response.data;
        notificationData(resData.data);
        OutstandingFilter(resData.data);
        setTotal(resData.total);
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
      name: "Join Date",
      selector: (row) => row.Joindate,
      sortable: true,
      width: "120px",
    },
    {
      name: "AMC Date",
      selector: (row) => row.amcdate,
      sortable: true,
      width: "120px",
    },

    {
      name: "Month",
      selector: (row) => row.Month,
      width: "120px",
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

    const keys = ["name", "Joindate", "amcdate", "Month", "AMC"];

    const filter = filteroutdata?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    notificationData(filter);
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-lan-pending" />
          </span>{" "}
          Upcoming AMC Clients
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

                <div className="col-lg-2"></div>
                <div className="col-lg-6">
                  <strong>Total Upcoming AMC Balance:</strong> {total}
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

export default NotificationShow;
