import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import $ from "jquery";

function CongregationList() {
  $(document).ready(function () {
    $(".Congregation").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(".CongregationList tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  const [Cong, Setcongregation] = useState([]);

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Congregation`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        Setcongregation(resp.data);
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
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Congregation
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
              {/* <h4 className="card-title">Congregation List</h4>   */}
              <div className="row">
                <div className="col-lg-4">
                  <input
                    id="myInput"
                    type="text"
                    className="form-control Congregation"
                    placeholder="Search.."
                  />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {/* <Link to="/Religio/Congregation/Add" className="btn btn-gradient-light">Add</Link> */}
                  {isLogedIn?.role == "admin" ? (
                    <Link
                      to="/Religio/Congregation/Add"
                      className="btn btn-gradient-light">
                      Add
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br></br>
              <div className="table-responsive text-nowrap">
                <table className="table table-striped CongregationList">
                  <thead>
                    <tr>
                      {/* <th>S.No</th> */}
                      <th>Congregation Name </th>
                      <th>Mobile</th>
                      <th>Email</th>
                      {/* <th>Address1</th>
                    <th>Postcode</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Cong &&
                      Cong.map((item) => (
                        <tr key={item.id}>
                          {/* <td></td> */}
                          <td>{item.congregation}</td>
                          <td>{item.mobile}</td>
                          <td>{item.email}</td>
                          {/* <td>{item.address1}</td>
                        <td>{item.postcode}</td> */}
                          <td id="noprint">
                            <a
                              onClick={(e) => Viewcongregation(e, item.id)}
                              style={{ cursor: "pointer" }}
                              className="mdi mdi-eye"
                              id="print"></a>
                            &nbsp;
                            {isLogedIn?.role == "admin" && (
                              <a
                                onClick={(e) => EditCongregation(e, item.id)}
                                style={{ cursor: "pointer" }}
                                className="mdi mdi-pencil-box"
                                id="print">
                                {" "}
                              </a>
                            )}
                            {isLogedIn?.role == "admin" && (
                              <a
                                onClick={(e) => deleteCongregation(e, item.id)}
                                style={{ cursor: "pointer" }}
                                className="mdi mdi-delete"
                                id="print"></a>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CongregationList;
