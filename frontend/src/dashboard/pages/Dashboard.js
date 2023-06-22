import axios from "axios";
import React from "react";
import ApiUrl from "./Api/Api";
import { useEffect, useState } from "react";
import $ from "jquery";

import DataTable from "react-data-table-component";

function Dashboard() {
  hidemenubar();
  const today = new Date();
  const cyear = today.getFullYear();
  const fyear = cyear + 1;
  const financial = `${cyear}-${fyear}`;
  const cday = today.getDate();
  // console.log(cday);
  // if (cday == "1") {
  // axios
  //   .get(`${ApiUrl}/Religio/Projectexpire`)
  //   .then((response) => {
  //     const resData = response.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
  function hidemenubar() {
    let value = $("body").attr("class");
    if (value === undefined) {
      $("body").addClass("sidebar-icon-only");
    } else {
      $("body").removeAttr("class");
    }
  }

  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  const [Title, Dynamictitle] = useState([]);

  const value = "NewSales";

  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/ClientType/getBalance/${value}`)
      .then((response) => {
        const resData = response.data;
        Dynamictitle("New Sales");
        getDatatable(resData.dataall);

        SetBalance(resData.data);
        // FinancialYear(resData.data.year);
        // FinancialMonth(resData.data.Month);
        $(".pericon").hide();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/ClientType/Getfinancialyears`)
      .then((response) => {
        const resData = response.data;
        FinancialYear(resData.data);
        console.log(resData.month);
        FinancialMonth(resData.month);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function getData(event) {
    $(".monthlabel").text("Select All");
    const values = event.target.text;

    if (values === "AMC") {
      $("#hdvalue").text("AMC Cost");
      $("#thisclient").text("Received Amount");
      $("#Balance").text("Balance");
      $(".yearlabel").text(financial);
      $("#monthnav").show();
      $(".inricon").show();
      $(".pericon").hide();
    } else if (values === "Clients") {
      $("#hdvalue").text("Overall Clients");
      $("#thisclient").text("New Clients");
      $("#Balance").text("Ongoing Projects");
      $(".yearlabel").text(financial);
      $("#monthnav").hide();
      $(".inricon").hide();
      $(".pericon").show();
    } else {
      $("#hdvalue").text("New Sales");
      $("#thisclient").text("Received Amount");
      $("#Balance").text("Balance");
      $(".yearlabel").text(financial);
      $("#monthnav").show();
      $(".inricon").show();
      $(".pericon").hide();
    }

    if (values === "Select All") {
      const get = $("#client").text();

      if (get === "AMC") {
        $("#hdvalue").text("AMC Cost");
        $("#thisclient").text("Received Amount");
        $("#monthnav").show();
        $("#Balance").text("Balance");
        $(".inricon").show();
        $(".pericon").hide();
      } else if (get === "Clients") {
        $("#hdvalue").text("Overall Clients");
        $("#monthnav").hide();
        $("#thisclient").text("New Clients");
        $("#Balance").text("Ongoing Projects");
        $(".inricon").hide();
        $(".pericon").show();
      } else {
        $("#hdvalue").text("New Sales");
        $("#thisclient").text("Received Amount");
        $("#monthnav").show();
        $("#Balance").text("Balance");
        $(".inricon").show();
        $(".pericon").hide();
      }
      if (get === "New Sales") {
        const data = "NewSales";
        $(".yearlabel").text(values);
        axios
          .get(`${ApiUrl}/Religio/ClientType/getBalance/selectall/${data}`)
          .then((response) => {
            const resData = response.data;

            SetBalance(resData.data);
            // FinancialYear(resData.data.year);
            FinancialMonth(resData.data.Month);
            Dynamictitle("New Sales");
            getDatatable(resData.dataall);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const data = get;
        console.log(data);
        if (data === "Clients") {
          $(".yearlabel").text(values);
          axios
            .get(`${ApiUrl}/Religio/ClientType/getBalance/selectall/${data}`)
            .then((response) => {
              const resData = response.data;
              SetBalance(resData.data);
              Dynamictitle("Clients");
              SetClientregister(resData.dataall);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          $(".yearlabel").text(values);
          axios
            .get(`${ApiUrl}/Religio/ClientType/getBalance/selectall/${data}`)
            .then((response) => {
              const resData = response.data;
              SetBalance(resData.data);
              // FinancialYear(resData.data.year);
              FinancialMonth(resData.data.Month);
              Dynamictitle(data);
              getDatatable(resData.dataall);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } else if (values === "New Sales") {
      const data = "NewSales";
      $("#client").text(values);
      axios
        .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
        .then((response) => {
          const resData = response.data;
          SetBalance(resData.data);
          // FinancialYear(resData.data.year);
          FinancialMonth(resData.data.Month);
          Dynamictitle(values);
          getDatatable(resData.dataall);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = values;
      $("#client").text(values);
      if (data === "Clients") {
        axios
          .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
          .then((response) => {
            const resData = response.data;
            SetBalance(resData.data);
            Dynamictitle(data);
            // FinancialYear(resData.data.year);
            SetClientregister(resData.dataall);
          })
          .catch((response) => {
            const resData = response.data;
            SetBalance(resData);
            // FinancialYear(resData);
            FinancialMonth(resData);
          });
      } else {
        axios
          .get(`${ApiUrl}/Religio/ClientType/getBalance/${data}`)
          .then((response) => {
            const resData = response.data;
            SetBalance(resData.data);
            // FinancialYear(resData.data.year);
            FinancialMonth(resData.data.Month);
            Dynamictitle(data);
            getDatatable(resData.dataall);
          })
          .catch((response) => {
            const resData = response.data;
            SetBalance(resData);
            // FinancialYear(resData);
            FinancialMonth(resData);
          });
      }
    }
  }

  const [balance, SetBalance] = useState("");
  const [year, FinancialYear] = useState([]);
  const [Month, FinancialMonth] = useState([]);
  const [getdatafilter, getDatatable] = useState([]);
  const [register, SetClientregister] = useState([]);

  function getMonthData(event) {
    const month = event.target.text;
    const choyear = $("#yearlabel").text();
    const ClientType = $("#client").text();
    if (ClientType === "New Sales") {
      const data = "NewSales";
      axios
        .post(
          `${ApiUrl}/Religio/financialmonth/getBalance/?type=${data}&month=${month}&year=${choyear}`
        )
        .then((response) => {
          const resData = response.data;
          SetBalance(resData.data);
          getDatatable(resData.dataall);
          console.log(resData);
        })
        .catch((err) => {
          console.log(err);
        });
      $(".monthlabel").text(month);
    } else {
      axios
        .post(
          `${ApiUrl}/Religio/financialmonth/getBalance/?type=${ClientType}&month=${month}&year=${choyear}`
        )
        .then((response) => {
          const resData = response.data;
          console.log(resData);
          SetBalance(resData.data);
          console.log(resData);
          getDatatable(resData.dataall);
        })
        .catch((err) => {
          console.log(err);
        });
      $(".monthlabel").text(month);
    }
  }

  function GetbalanbeYeardata(event) {
    const year = event.target.text;
    $(".monthlabel").text("Select All");
    const ClientType = $("#client").text();
    if (ClientType === "New Sales") {
      const data = "NewSales";
      axios
        .post(
          `${ApiUrl}/Religio/financialyear/getBalance/?type=${data}&year=${year}`
        )
        .then((response) => {
          const resData = response.data;

          SetBalance(resData.data);
          FinancialMonth(resData.data.Month);
          getDatatable(resData.dataall);
        })
        .catch((err) => {
          console.log(err);
        });
      $(".yearlabel").text(year);
    } else if (ClientType === "Clients") {
      axios
        .post(
          `${ApiUrl}/Religio/financialyear/getBalance/?type=${ClientType}&year=${year}`
        )
        .then((response) => {
          const resData = response.data;
          SetBalance(resData.data);
          SetClientregister(resData.dataall);
        })
        .catch((err) => {
          console.log(err);
        });
      $(".yearlabel").text(year);
    } else {
      axios
        .post(
          `${ApiUrl}/Religio/financialyear/getBalance/?type=${ClientType}&year=${year}`
        )
        .then((response) => {
          const resData = response.data;
          SetBalance(resData.data);
          FinancialMonth(resData.data.Month);
          getDatatable(resData.dataall);
        })
        .catch((err) => {
          console.log(err);
        });
      $(".yearlabel").text(year);
    }
  }
  // for table view

  const columns = [
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true,
    },
    {
      name: "Client Type",
      selector: (row) => row.clienttype,
      sortable: true,
    },
    {
      name: "Client Code",
      selector: (row) => row.clientcode,
      sortable: true,
    },
    {
      name: "Project Value",
      selector: (row) => row.projectvalue,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
  ];
  const amccolumns = [
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true,
    },
    {
      name: "Client Type",
      selector: (row) => row.clienttype,
      sortable: true,
    },
    {
      name: "Client Code",
      selector: (row) => row.clientcode,
      sortable: true,
    },
    {
      name: "AMC Value",
      selector: (row) => row.amcvalue,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
  ];
  const columnsreg = [
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Place",
      selector: (row) => row.place,
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "13px",
        fontWeight: "600",
        fontFamily: "sans-serif",
        color: "#343a40",
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

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home" />
          </span>{" "}
          Dashboard
        </h3>
        {isLogedIn?.role == "admin" ? (
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
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={getData}>
                    <i className="mdi mdi-chevron-double-down me-2 text-success " />
                    New Sales
                  </a>
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={getData}>
                    <i className="mdi mdi-cached me-2 text-primary" />
                    AMC
                  </a>
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={getData}>
                    <i className="mdi mdi-checkbox-multiple-blank-circle-outline me-2 text-danger" />
                    Clients
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
        {isLogedIn?.role == "admin" ? (
          <nav aria-label="breadcrumb" id="monthnav">
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
                    <p className="mb-1 text-black dropdown-toggle monthlabel">
                      Select All
                    </p>
                  </div>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown"
                  aria-labelledby="profileDropdown">
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={getMonthData}>
                    {/* <i className="mdi mdi-check-all me-2 text-primary" /> */}
                    Select All
                  </a>
                  {Month.map((item) => (
                    <a
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={getMonthData}>
                      {/* <i className="mdi mdi-calendar-check me-2 text-primary" /> */}
                      {item}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
        {isLogedIn?.role == "admin" ? (
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
                    <p
                      className="mb-1 text-black dropdown-toggle yearlabel"
                      id="yearlabel">
                      {cyear}-{fyear}
                    </p>
                  </div>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown"
                  aria-labelledby="profileDropdown">
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={getData}>
                    {/* <i className="mdi mdi-check-all me-2 text-primary" /> */}
                    Select All
                  </a>
                  {year.map((item) => (
                    <a
                      className="dropdown-item"
                      key={item}
                      style={{ cursor: "pointer" }}
                      onClick={GetbalanbeYeardata}>
                      {/* <i className="mdi mdi-calendar-check me-2 text-primary" /> */}
                      {item}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </div>
      {isLogedIn?.role == "admin" ? (
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
                  <span id="hdvalue">New Sales</span>
                  <i className="mdi mdi-cash-multiple mdi-24px float-right" />
                </h4>
                <h2 className="mb-5">
                  <i className="mdi mdi-currency-inr inricon" />
                  <i className="mdi mdi-account-group pericon" />{" "}
                  {balance.total}
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
                  <span id="thisclient">Received Amount</span>
                  <i className="mdi mdi-cash-usd mdi-24px float-right" />
                </h4>

                <h2 className="mb-5">
                  <i className="mdi mdi-currency-inr inricon" />
                  <i className="mdi mdi-account pericon" /> {balance.paid}
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
                  <span id="Balance">Balance</span>
                  <i className="fa-solid fa-money-bill-1-wave mdi-24px float-right" />
                </h4>
                <h2 className="mb-5">
                  <i className="mdi mdi-currency-inr inricon" />
                  <i className="mdi mdi-account pericon" />
                  {balance.balance}
                </h2>
                {/* <h6 className="card-text">Increased by {balance.balPer}%</h6> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Clients {Title !== "Clients" && Title}
              </h4>
              <div className="table-responsive">
                {Title === "AMC" && (
                  <DataTable
                    // title={Title}
                    columns={amccolumns}
                    data={getdatafilter}
                    pagination
                    customStyles={customStyles}
                  />
                )}
                {Title === "New Sales" && (
                  <DataTable
                    // title={Title}
                    columns={columns}
                    data={getdatafilter}
                    pagination
                    customStyles={customStyles}
                  />
                )}
                {Title === "Clients" && (
                  <DataTable
                    columns={columnsreg}
                    theme="solarized"
                    data={register}
                    pagination
                    customStyles={customStyles}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
