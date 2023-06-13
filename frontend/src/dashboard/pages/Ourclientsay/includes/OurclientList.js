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

function OurclientList() {
  // Get User data
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const exportcongregationTable = () => {
    axios
      .get(`${ApiUrl}/Religio/HomeSections/OurClient/Export`)
      .then((response) => {
        // Trigger file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "OurClients.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Export error:", error);
      });
  };
  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurClient/list`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        OurClientLists(resp.data);
        clientFilter(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [preImg, previewImage] = useState([]);

  function handleShow(e, logoitem) {
    setShow(true);
    previewImage(logoitem);
  }
  const navigate = useNavigate();
  function handleedit(e, id) {
    navigate("/Religio/HomeSections/OurClient/edit/" + id);
  }
  const [OurClients, OurClientLists] = useState([]);
  const [filterClient, clientFilter] = useState([]);

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
          .delete(`${ApiUrl}/Religio/HomeSections/OurClient/delete/${id}`)
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
      name: "Province",
      selector: (row) => (
        <>
          <a onClick={(e) => handleShow(e, row)} className="my-component">
            {row.prname}
          </a>
        </>
      ),
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row) => row.crname,
      sortable: true,
    },
    {
      name: "Logo with Name",
      cell: (row) => (
        <>
          <img
            src={AppUrl + "/Ourclient/logo/" + row.logo}
            className="me-2"
            alt="image"
            onClick={(e) => handleShow(e, row)}
            style={{
              cursor: "pointer",
              width: "36px",
              height: "36px",
              borderradius: "100%",
            }}
          />
          {row.logo}
        </>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <a
            onClick={(e) => handleShow(e, row)}
            style={{ cursor: "pointer" }}
            className="mdi mdi-eye"></a>
          &nbsp;
          {isLogedIn?.role === "admin" && (
            <>
              <a
                className="mdi mdi-pencil-box"
                onClick={(e) => handleedit(e, row.id)}
                style={{ cursor: "pointer" }}
                id="print"></a>
            </>
          )}
          {isLogedIn?.role === "admin" && (
            <>
              <a
                className="mdi mdi-delete"
                onClick={(e) => deleteClientLogo(e, row.id)}
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

    const keys = ["prname", "crname", "logo"];

    const filter = filterClient?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    OurClientLists(filter);
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-group menu-icon" />
          </span>{" "}
          Our Clients
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
                    <Link to="/Religio/HomeSections/OurClient/Create">
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
              <Modal show={show} onHide={handleClose} className="modal-md">
                <Modal.Header closeButton>
                  <Modal.Title>Our Client Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        Congregation &nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={preImg.cgname}
                        disabled
                      />
                      <br />
                    </div>
                    <div className="col-md-6">
                      <label>
                        Province &nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={preImg.prname}
                        disabled
                      />
                      <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>
                        Client &nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={preImg.crname}
                        disabled
                      />
                      <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>
                        Client Logo &nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <center>
                        <img
                          src={AppUrl + "/Ourclient/logo/" + preImg.logo}
                          height={130}
                        />
                      </center>
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
    </div>
  );
}
export default OurclientList;
