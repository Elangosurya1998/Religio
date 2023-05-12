import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";

function ClientregistrationList() {
  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Clientregistration`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        SetClientregister(resp.data);
        FilterClientregister(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  const [register, SetClientregister] = useState([]);
  const [FilterRegister, FilterClientregister] = useState([]);
  const navigate = useNavigate();

  const EditClientregistration = async (e, id) => {
    navigate("/Religio/Clientregistration/Edit/" + id);
  };

  const deleteregister = async (e, id) => {
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
          .delete(`${ApiUrl}/Religio/Clientregistration/${id}`)
          .then((res) => {
            fetchData();
          });
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  };
  const Viewregister = async (e, id) => {
    navigate("/Religio/Clientregistration/View/" + id);
  };
  const columns = [
    {
      name: "Congregation",
      selector: (row) => row.congregation,
      sortable: true,
    },
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Place",
      selector: (row) => row.place,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => [
        <a
          onClick={(e) => Viewregister(e, row.id)}
          style={{ cursor: "pointer", paddingRight: 4 }}
          className="mdi mdi-eye"
          id="print"></a>,
        <a
          onClick={(e) => EditClientregistration(e, row.id)}
          style={{ cursor: "pointer", paddingRight: 4 }}
          className="mdi mdi-pencil-box"
          id="print"></a>,
        <a
          onClick={(e) => deleteregister(e, row.id)}
          style={{ cursor: "pointer" }}
          className="mdi mdi-delete"
          id="print"></a>,
      ],
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  function filterdata(event) {
    var value = event.target.value;

    const keys = ["congregation", "province", "name", "place"];

    const filter = FilterRegister?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    SetClientregister(filter);
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Client Registration
        </h3>
        {/* <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
            </li>
          </ul>
        </nav> */}
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
                    onClick={filterdata}
                    className="form-control myInput"
                    placeholder="Search.."
                  />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role == "admin" ? (
                    <Link
                      to="/Religio/Clientregistration/Add"
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
                data={register}
                pagination
                // selectableRows
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientregistrationList;
