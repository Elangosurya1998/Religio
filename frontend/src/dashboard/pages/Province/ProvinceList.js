import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import DataTable from "react-data-table-component";

function ProvinceList() {
  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Province`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        SetProvince(resp.data);
        ProvinceFilter(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const [Pro, SetProvince] = useState([]);

  const [filterPro, ProvinceFilter] = useState([]);

  const navigate = useNavigate();

  const EditProvince = async (e, id) => {
    navigate("/Religio/Province/Edit/" + id);
  };

  const ViewProvince = async (e, id) => {
    navigate("/Religio/Province/View/" + id);
  };

  const deleteProvince = async (e, id) => {
    axios.get(`${ApiUrl}/Religio/Provinceverifydelete/${id}`).then((res) => {
      const result = res.data.message;
      console.log(result);
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
            axios.delete(`${ApiUrl}/Religio/Province/${id}`).then((res) => {
              fetchData();
            });
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
          }
        });
      } else {
        Swal.fire({
          title: "Sorry you can't delete this Province",
          text: "Client's are registered using this Province",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    });
  };
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true,
    },
    {
      name: "Congregation",
      selector: (row) => row.congregation,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => [
        <a
          onClick={(e) => ViewProvince(e, row.id)}
          style={{ cursor: "pointer", paddingRight: 4, color: "#b66dff" }}
          className="mdi mdi-eye"
          id="print"></a>,
        <a
          onClick={(e) => EditProvince(e, row.id)}
          style={{ cursor: "pointer", paddingRight: 4, color: "#b66dff" }}
          className="mdi mdi-pencil-box"
          id="print"></a>,

        <a
          onClick={(e) => deleteProvince(e, row.id)}
          style={{ cursor: "pointer", color: "#b66dff" }}
          className="mdi mdi-delete"
          id="print"></a>,
      ],
      width: "100px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
        backgroundColor: "#fafafa", // override the row height
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

    const keys = ["province", "congregation", "email"];

    const filter = filterPro?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    SetProvince(filter);
  }
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(Pro);
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
          Province
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
                    <Link
                      to="/Religio/Province/Add"
                      className="btn btn-gradient-light">
                      Add
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br></br>

              <DataTable
                columns={columns}
                data={Pro}
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
export default ProvinceList;
