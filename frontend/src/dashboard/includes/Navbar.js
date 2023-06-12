import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ApiUrl from "../pages/Api/Api";
import $ from "jquery";

function hidemenubar() {
  let value = $("body").attr("class");
  if (value === undefined) {
    $("body").addClass("sidebar-icon-only");
  } else {
    $("body").removeAttr("class");
  }
}

function hideshowmenubar() {
  let value = $("nav.sidebar-offcanvas").attr("class");
  if (value === "sidebar sidebar-offcanvas") {
    $("nav.sidebar-offcanvas").addClass("active");
  }
}

function Navbar() {
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const handleSignOut = () => {
    sessionStorage.removeItem("userDetails");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${ApiUrl}/Religio/Balance/notification`)
      .then((response) => {
        const resData = response.data;
        notificationData(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [data, notificationData] = useState([]);

  function notificationAMC() {
    navigate("/Religio/AMC/Notification");
  }

  function notificationDomain() {
    navigate("/Religio/UpcomingDomainRenewel");
  }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="">
          Religio Management
        </a>
        <a className="navbar-brand brand-logo-mini" href="">
          <img src="/relogio.png"></img>
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
          onClick={hidemenubar}>
          <span className="mdi mdi-menu" />
        </button>
        {/* <div className="search-field d-none d-md-block">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i className="input-group-text border-0 mdi mdi-magnify" />
              </div>
              <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
            </div>
          </form>
        </div> */}
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-bs-toggle="dropdown">
              <i className="mdi mdi-bell-outline" />
              <span className="count-symbol bg-danger" />
            </a>
            <div
              className="dropdown-menu navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown">
              <h6 className="p-3 mb-0">Notifications</h6>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item preview-item"
                onClick={notificationAMC}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <i className="mdi mdi-calendar" />
                  </div>
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                  {/* <h6 className="preview-subject font-weight-normal mb-1">
                    Event today
                  </h6> */}
                  <p className="text-gray ellipsis mb-0">
                    {" "}
                    Upcoming AMC Clients{" "}
                  </p>
                </div>
              </a>
              {/* <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="mdi mdi-domain" />
                  </div>
                </div>
                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center"> */}
              {/* <h6 className="preview-subject font-weight-normal mb-1">
                    Event today
                  </h6> */}
              {/* <p
                    className="text-gray ellipsis mb-0"
                    onClick={notificationDomain}>
                    {" "}
                    Upcoming Domain Renewel{" "}
                  </p>
                </div> */}
              {/* </a> */}
            </div>
          </li>
          <li className="nav-item dropdown">&nbsp;</li>
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <div className="nav-profile-img">
                <img
                  src="/dashboard/assets/images/faces/face1.jpg"
                  alt="image"
                />
                <span className="availability-status online" />
              </div>
              <div className="nav-profile-text">
                <p className="mb-1 text-black">{isLogedIn?.username}</p>
              </div>
            </a>
            <div
              className="dropdown-menu navbar-dropdown"
              aria-labelledby="profileDropdown">
              <a className="dropdown-item" href="#">
                <i className="mdi mdi-cached me-2 text-success" /> Activity Log{" "}
              </a>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                onClick={() => handleSignOut()}
                style={{ cursor: "pointer" }}>
                <i className="mdi mdi-logout me-2 text-primary" />
                Signout
              </a>
            </div>
          </li>
          <li className="nav-item nav-settings d-none d-lg-block">
            <a className="nav-link" href="#">
              <i className="mdi mdi-format-line-spacing" />
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={hideshowmenubar}>
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
