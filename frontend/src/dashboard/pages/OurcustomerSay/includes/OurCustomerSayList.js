import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../../Api/Api";
import AppUrl from "../../Api/Url";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OurCustomerSayList() {

  // Get User data
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurCustomerSay/list`).then((res) => {
      return res.json();
    }).then((resp) => {
      OurClientList(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  const [OurClients, OurClientList] = useState([]);


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

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-group menu-icon" />
          </span> Our Customer Say
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              < div className="row">
                <div className="col-lg-4">
                  <input id="myInput" type="text" className="form-control myInput" placeholder="Search.." />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role == "admin" && (
                    <Link to="/Religio/HomeSections/OurCustomerSay/Create" className="btn btn-gradient-light">Add</Link>
                  )}
                </div>
              </div>
              <br></br>
              <table className="table table-striped Mytable">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    OurClients && OurClients.map((item, index) => (
                      <tr>
                        {/* <td>{item.cgname}</td> */}
                        {/* <td>{item.prname}</td> */}
                        <td>
                          {item.crname}
                        </td>
                        <td>
                          {item.title}
                        </td>
                        <td>
                          <a
                            onClick={(e) => ViewOurCustomerSay(e, item.id)}
                            style={{ cursor: "pointer" }}
                            className="mdi mdi-eye"></a>
                          &nbsp;
                          {isLogedIn?.role == "admin" && (
                            <a
                              onClick={(e) => EditOurCustomerSay(e, item.id)}
                              style={{ cursor: "pointer" }}
                              className="mdi mdi-pencil-box"
                              id="print">
                              {" "}
                            </a>
                          )}
                          &nbsp;
                          {isLogedIn?.role == "admin" && (
                            <a
                              className="mdi mdi-delete"
                              onClick={(e) => deleteOurCustomerSay(e, item.id)}
                              style={{ cursor: "pointer" }}
                              id="print"></a>
                          )}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}
export default OurCustomerSayList;
