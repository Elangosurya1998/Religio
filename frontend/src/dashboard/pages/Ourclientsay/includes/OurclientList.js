import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";

function OurclientList() {

  // Get User data
  const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurClient/list`).then((res) => {
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

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-group menu-icon" />
          </span> Our Clients
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
                    <Link to="/Religio/HomeSections/OurClient/Create" className="btn btn-gradient-light">Add</Link>
                  )}
                </div>
              </div>
              <br></br>
              <table className="table table-striped Mytable">
                <thead>
                  <tr>
                    <th>Congregation</th>
                    <th>Province</th>
                    <th>Logo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    OurClients && OurClients.map(item => (
                      <tr>
                        <td>{item.congregation}</td>
                        <td>{item.province}</td>
                        <td>{item.logo}</td>
                        <td>
                          <a className="mdi mdi-eye" id="print"></a>
                          &nbsp;
                          <a className="mdi mdi-pencil-box" id="print"></a>
                          &nbsp;
                          <a className="mdi mdi-delete" id="print"></a>
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
export default OurclientList;
