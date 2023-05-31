import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../../Api/Api";
import AppUrl from "../../Api/Url";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import $ from "jquery";


function DomainrenewalList() {

  // Get User data
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Domainrenewal/list`).then((res) => {
      return res.json();
    }).then((resp) => {
      DomainrenewalList(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [preImg, previewImage] = useState([])

  function handleShow(e, logoitem) {
    setShow(true)
    previewImage(logoitem);
  }



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

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-domain menu-icon" />
          </span> Domain Renewal
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
                    <Link to="/Religio/DomainRenewal/Create" className="btn btn-gradient-light">Add</Link>
                  )}
                </div>
              </div>
              <br></br>
              <table className="table table-striped Mytable">
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>Site Url</th>
                    <th>Server Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Domainrenewals && Domainrenewals.map((item, index) => (
                      <tr>
                        <td>
                          {item.sitename}
                        </td>
                        <td>
                          {item.siteurl}
                        </td>
                        <td>
                          {item.domain_expire_date}
                        </td>
                        <td>
                          <a
                            onClick={(e) => handleShow(e, item)} style={{ cursor: "pointer" }}
                            className="mdi mdi-eye"></a>
                          &nbsp;
                          <a
                            className="mdi mdi-delete"
                            onClick={(e) => deleteClientLogo(e, item.id)}
                            style={{ cursor: "pointer" }}
                            id="print"></a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Modal show={show} onHide={handleClose} className="modal-md">
                <Modal.Header closeButton>
                  <Modal.Title>Our Client Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control" value={preImg.cgname} disabled />
                      <br />
                    </div>
                    <div className="col-md-6">
                      <label>Province &nbsp;<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control" value={preImg.prname} disabled />
                      <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Client &nbsp;<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control" value={preImg.crname} disabled />
                      <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Client Logo &nbsp;<span style={{ color: 'red' }}>*</span></label>
                      <center><img src={AppUrl + "/Domainrenewal/logo/" + preImg.logo} height={130} /></center>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}
export default DomainrenewalList;
