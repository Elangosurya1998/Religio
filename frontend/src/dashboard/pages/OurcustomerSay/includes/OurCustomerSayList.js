import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../../Api/Api";
import AppUrl from "../../Api/Url";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";

function OurCustomerSayList() {
  // Get User data
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const exportcongregationTable = () => {
    axios
      .get(`${ApiUrl}/Religio/HomeSections/OurCustomerSay/Export`)
      .then((response) => {
        // Trigger file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "OurCustomerSays.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Export error:", error);
      });
  };
  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurCustomerSay/list`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        OurClientList(resp.data);
        clientFilter(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [OurClients, OurClientList] = useState([]);
  const [filterClient, clientFilter] = useState([]);

  function deleteOurCustomerSay(e, clientId) {
    const id = clientId;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${ApiUrl}/Religio/HomeSections/OurCustomerSay/delete/${id}`)
          .then((res) => {
            fetchData();
          });
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  }
  const navigate = useNavigate();

  const ViewOurCustomerSay = async (e, id) => {
    navigate("/Religio/HomeSections/OurCustomerSay/View/" + id);
  };

  const EditOurCustomerSay = async (e, id) => {
    navigate("/Religio/HomeSections/OurCustomerSay/Edit/" + id);
  };
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Client Name",
      selector: (row) => (
        <>
          <a
            onClick={(e) => ViewOurCustomerSay(e, row.id)}
            className="my-component">
            {row.crname}
          </a>
        </>
      ),
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <a
            onClick={(e) => ViewOurCustomerSay(e, row.id)}
            style={{ cursor: "pointer" }}
            className="mdi mdi-eye"></a>
          &nbsp;
          {isLogedIn?.role === "admin" && (
            <>
              <a
                onClick={(e) => EditOurCustomerSay(e, row.id)}
                style={{ cursor: "pointer" }}
                className="mdi mdi-pencil-box"
                id="print">
                {" "}
              </a>
              &nbsp;
            </>
          )}
          {isLogedIn?.role === "admin" && (
            <>
              <a
                className="mdi mdi-delete"
                onClick={(e) => deleteOurCustomerSay(e, row.id)}
                style={{ cursor: "pointer" }}
                id="print"></a>
            </>
          )}
        </>
      ),
      width: "100px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
        backgroundColor: "#fafafa",
        // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
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

    const keys = ["title", "crname"];

    const filter = filterClient?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    OurClientList(filter);
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-group menu-icon" />
          </span>{" "}
          Our Customer Say
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <input
                    id="myInput"
                    type="text"
                    className="form-control myInput"
                    onChange={filterdata}
                    placeholder="Search.."
                  />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role == "admin" && (
                    <Link to="/Religio/HomeSections/OurCustomerSay/Create">
                      <i
                        class="fa-solid fa-user-plus"
                        style={{ color: "black" }}></i>
                    </Link>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <label onClick={exportcongregationTable}>
                    <i
                      class="fa-solid fa-file-csv"
                      style={{ color: "black", cursor: "pointer" }}></i>
                  </label>
                </div>
              </div>
              <br></br>
              <DataTable
                columns={columns}
                data={OurClients}
                pagination
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OurCustomerSayList;
