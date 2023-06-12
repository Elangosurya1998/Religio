import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import DataTable from "react-data-table-component";

function CongregationList() {
  const exportcongregationTable = () => {
    axios
      .get(`${ApiUrl}/Religio/Congregation/export`)
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
  const [Cong, Setcongregation] = useState([]);

  const [filterCong, congregationFilter] = useState([]);

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Congregation`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        Setcongregation(resp.data);
        congregationFilter(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteCongregation = async (e, id) => {
    axios
      .get(`${ApiUrl}/Religio/Congregationverifydelete/${id}`)
      .then((res) => {
        const result = res.data.message;
        if (result === "false") {
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
                .delete(`${ApiUrl}/Religio/Congregation/${id}`)
                .then((res) => {
                  fetchData();
                });
              Swal.fire("Deleted!", "Your record has been deleted.", "success");
            }
          });
        } else {
          Swal.fire({
            title: "Sorry you can't delete this Congregation",
            text: "Some Provice are registered using this Congregation",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const navigate = useNavigate();
  const EditCongregation = async (e, id) => {
    navigate("/Religio/Congregation/Edit/" + id);
  };

  const Viewcongregation = async (e, id) => {
    navigate("/Religio/Congregation/View/" + id);
  };
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Congregation Name",
      cell: (row) => (
        <>
          <a
            onClick={(e) => Viewcongregation(e, row.id)}
            style={{ cursor: "pointer", paddingRight: 4, color: "black" }}>
            {row.congregation}
          </a>
        </>
      ),
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <a
            onClick={(e) => Viewcongregation(e, row.id)}
            style={{ cursor: "pointer", paddingRight: 4, color: "black" }}
            className="mdi mdi-eye"></a>
          {isLogedIn?.role === "admin" && (
            <>
              <a
                onClick={(e) => EditCongregation(e, row.id)}
                style={{ cursor: "pointer", paddingRight: 4, color: "black" }}
                className="mdi mdi-pencil-box"></a>

              <a
                onClick={(e) => deleteCongregation(e, row.id)}
                style={{ cursor: "pointer", color: "black" }}
                className="mdi mdi-delete"></a>
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

    const keys = ["congregation", "mobile", "email"];

    const filter = filterCong?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    Setcongregation(filter);
  }
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(Cong);
      setPending(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Congregation
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
                    onChange={filterdata}
                    className="form-control Province"
                    placeholder="Search.."
                  />
                </div>

                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role == "admin" ? (
                    <Link to="/Religio/Congregation/Add">
                      <i
                        class="fa-solid fa-user-plus"
                        style={{ color: "black" }}></i>
                    </Link>
                  ) : (
                    ""
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
                data={Cong}
                pagination
                progressPending={pending}
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CongregationList;
