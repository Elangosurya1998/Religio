import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../../Api/Api";
import AppUrl from "../../Api/Url";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import DataTable from "react-data-table-component";

function DomainrenewalList() {
  // Get User data
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Domainrenewal/list`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        DomainrenewalList(resp.data);
        FilterClientregister(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleShow = async (e, id) => {
    navigate("/Religio/DomainRenewal/View/" + id);
  };

  const handleEdit = async (e, id) => {
    navigate("/Religio/DomainRenewal/Edit/" + id);
  };
  const [Domainrenewals, DomainrenewalList] = useState([]);

  function deleteClientLogo(e, clientId) {
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
          .delete(`${ApiUrl}/Religio/Domainrenewal/delete/${id}`)
          .then((res) => {
            fetchData();
          });
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  }
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Domain Name",
      selector: (row) => row.sitename,
      sortable: true,
    },
    {
      name: "Domain Url",
      selector: (row) => row.siteurl,
      sortable: true,
    },
    {
      name: "Server Name",
      selector: (row) => row.servername,
      sortable: true,
    },
    {
      name: "Domain Expire Date",
      selector: (row) => row.domain_expire_date,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <a
            onClick={(e) => handleShow(e, row.id)}
            style={{
              cursor: "pointer",
              paddingRight: 4,
              color: "#b66dff",
            }}
            className="mdi mdi-eye"></a>

          <a
            onClick={(e) => handleEdit(e, row.id)}
            style={{
              cursor: "pointer",
              paddingRight: 4,
              color: "#b66dff",
            }}
            className="mdi mdi-pencil-box"></a>

          <a
            className="mdi mdi-delete"
            onClick={(e) => deleteClientLogo(e, row.id)}
            style={{
              cursor: "pointer",
              paddingRight: 4,
              color: "#b66dff",
            }}
            id="print"></a>
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
  const [FilterRegister, FilterClientregister] = useState([]);

  function filterdata(event) {
    var value = event.target.value;
    const keys = ["sitename", "siteurl", "servername", "domain_expire_date"];

    const filter = FilterRegister?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    console.log(value, filter);

    DomainrenewalList(filter);
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-domain menu-icon" />
          </span>{" "}
          Domain Renewal
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
                    className="form-control myInput"
                    placeholder="Search.."
                  />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role == "admin" && (
                    <Link
                      to="/Religio/DomainRenewal/Create"
                      className="btn btn-gradient-light">
                      Add
                    </Link>
                  )}
                </div>
              </div>
              <br></br>
              <DataTable
                columns={columns}
                theme="solarized"
                data={Domainrenewals}
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
export default DomainrenewalList;
