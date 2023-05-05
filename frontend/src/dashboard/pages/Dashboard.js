import axios from "axios";
import { useForm } from "react-hook-form";
import ApiUrl from "./Api/Api";
import { useEffect, useState } from "react";
import $ from "jquery";

function Dashboard() {
  const value = "NewSales";

  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/ClientType/getBalance/${value}`)
      .then((response) => {
        const resData = response.data;
        SetBalance(resData.data);
        FinancialYear(resData.data.year);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getData(event) {
    const values = event.target.text;
    if (values === "AMC") {
      $("#hdvalue").text("AMC Cost");
    } else {
      $("#hdvalue").text("Project Cost");
    }

    if (values === "Select All") {
      const get = $("#client").text();

      if (get === "AMC") {
        $("#hdvalue").text("AMC Cost");
      } else {
        $("#hdvalue").text("Project Cost");
      }
      if (get === "New Sales") {
        const data = "NewSales";
        $("#yearlabel").text(values);
        axios
          .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
          .then((response) => {
            const resData = response.data;
            SetBalance(resData.data);
            FinancialYear(resData.data.year);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const data = get;
        $("#yearlabel").text(values);
        axios
          .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
          .then((response) => {
            const resData = response.data;
            SetBalance(resData.data);
            FinancialYear(resData.data.year);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (values === "New Sales") {
      const data = "NewSales";
      $("#client").text(values);
      axios
        .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
        .then((response) => {
          const resData = response.data;
          SetBalance(resData.data);
          FinancialYear(resData.data.year);
          console.log(resData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = values;
      $("#client").text(values);
      $("#yearlabel").text("Select All");
      axios
        .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
        .then((response) => {
          const resData = response.data;
          console.log(resData);
          SetBalance(resData.data);
          FinancialYear(resData.data.year);
        })
        .catch((response) => {
          console.log(response.data);
          const resData = response.data;
          SetBalance(resData);
          FinancialYear(resData);
        });
    }
  }

  const [balance, SetBalance] = useState("");

  // useEffect(() => {
  //   fetch(`${ApiUrl}/Religio/ClientType/Getfinancialyears`).then((res) => {
  //       return res.json();
  //   }).then((resp) => {
  //     FinancialYear(resp.data);
  //   }).catch((err) => {
  //       console.log(err.message);
  //   })
  // }, [])

  const [year, FinancialYear] = useState([]);

  function GetbalanbeYeardata(event) {
    const year = event.target.text;
    const ClientType = $("#client").text();
    if (ClientType === "New Sales") {
      const data = "NewSales";
      axios
        .post(
          `${ApiUrl}/Religio/financialyear/getBalance/?type=${data}&year=${year}`
        )
        .then((response) => {
          const resData = response.data;
          console.log(resData.data);
          SetBalance(resData.data);
        })
        .catch((err) => {
          console.log(err);
        });
      $("#yearlabel").text(year);
    } else {
      axios
        .post(
          `${ApiUrl}/Religio/financialyear/getBalance/?type=${ClientType}&year=${year}`
        )
        .then((response) => {
          const resData = response.data;
          console.log(resData.data);
          SetBalance(resData.data);
        })
        .catch((err) => {
          console.log(err);
        });
      $("#yearlabel").text(year);
    }
  }

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home" />
          </span>{" "}
          Dashboard
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link "
                id="profileDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <div className="nav-profile-img">
                  <span className="availability-status online" />
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black dropdown-toggle" id="client">
                    New Sales
                  </p>
                </div>
              </a>
              <div
                className="dropdown-menu navbar-dropdown nav-profile-text"
                aria-labelledby="profileDropdown">
                <a className="dropdown-item" onClick={getData}>
                  <i className="mdi mdi-chevron-double-down me-2 text-success " />
                  New Sales
                </a>
                <a className="dropdown-item" onClick={getData}>
                  <i className="mdi mdi-cached me-2 text-primary" />
                  AMC
                </a>
                <a className="dropdown-item" onClick={getData}>
                  <i className="mdi mdi-checkbox-multiple-blank-circle-outline me-2 text-danger" />
                  Outstanding
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link "
                id="profileDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <div className="nav-profile-img">
                  <span className="availability-status online" />
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black dropdown-toggle" id="yearlabel">
                    Select All
                  </p>
                </div>
              </a>
              <div
                className="dropdown-menu navbar-dropdown"
                aria-labelledby="profileDropdown">
                <a className="dropdown-item" onClick={getData}>
                  <i className="mdi mdi-check-all me-2 text-primary" />
                  Select All
                </a>
                {year.map((item) => (
                  <a
                    className="dropdown-item"
                    key={item}
                    onClick={GetbalanbeYeardata}>
                    <i className="mdi mdi-calendar-check me-2 text-primary" />
                    {item}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img
                src="/dashboard/assets/images/dashboard/circle.svg"
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                <span id="hdvalue">Project Cost</span>
                <i className="mdi mdi-cash-multiple mdi-24px float-right" />
              </h4>
              <h2 className="mb-5">
                <i className="mdi mdi-currency-inr" /> {balance.total}
              </h2>
              {/* <h6 className="card-text">Increased by 100%</h6> */}
            </div>
          </div>
        </div>

        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img
                src="/dashboard/assets/images/dashboard/circle.svg"
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                {" "}
                Received Amount
                <i className="mdi mdi-cash-usd mdi-24px float-right" />
              </h4>
              <h2 className="mb-5">
                <i className="mdi mdi-currency-inr" /> {balance.paid}
              </h2>
              {/* <h6 className="card-text">Decreased by {balance.paidPer}%</h6> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img
                src="/dashboard/assets/images/dashboard/circle.svg"
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                {" "}
                Balance
                <i className="mdi mdi-cash mdi-24px float-right" />
              </h4>
              <h2 className="mb-5">
                <i className="mdi mdi-currency-inr" /> {balance.balance}
              </h2>
              {/* <h6 className="card-text">Increased by {balance.balPer}%</h6> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Tickets</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Assignee </th>
                      <th> Subject </th>
                      <th> Status </th>
                      <th> Last Update </th>
                      <th> Tracking ID </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src="assets/images/faces/face1.jpg"
                          className="me-2"
                          alt="image"
                        />{" "}
                        David Grey
                      </td>
                      <td> Fund is not recieved </td>
                      <td>
                        <label className="badge badge-gradient-success">
                          DONE
                        </label>
                      </td>
                      <td> Dec 5, 2017 </td>
                      <td> WD-12345 </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src="assets/images/faces/face2.jpg"
                          className="me-2"
                          alt="image"
                        />{" "}
                        Stella Johnson
                      </td>
                      <td> High loading time </td>
                      <td>
                        <label className="badge badge-gradient-warning">
                          PROGRESS
                        </label>
                      </td>
                      <td> Dec 12, 2017 </td>
                      <td> WD-12346 </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src="assets/images/faces/face3.jpg"
                          className="me-2"
                          alt="image"
                        />{" "}
                        Marina Michel
                      </td>
                      <td> Website down for one week </td>
                      <td>
                        <label className="badge badge-gradient-info">
                          ON HOLD
                        </label>
                      </td>
                      <td> Dec 16, 2017 </td>
                      <td> WD-12347 </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src="assets/images/faces/face4.jpg"
                          className="me-2"
                          alt="image"
                        />{" "}
                        John Doe
                      </td>
                      <td> Loosing control on server </td>
                      <td>
                        <label className="badge badge-gradient-danger">
                          REJECTED
                        </label>
                      </td>
                      <td> Dec 3, 2017 </td>
                      <td> WD-12348 </td>
                    </tr>
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

export default Dashboard;
