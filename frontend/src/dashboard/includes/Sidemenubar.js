import { Link, useLocation } from "react-router-dom";
import React from 'react';

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function Sidemenubar() {

  const { pathname } = useLocation();

  const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));

  const navitem = "nav-item";

  return (
    < nav className="sidebar sidebar-offcanvas" id="sidebar" >
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
              <img src="/dashboard/assets/images/faces/face1.jpg" alt="profile" />
              <span className="login-status online" />
              {/*change to offline or busy as needed*/}
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">{Capitalize(isLogedIn?.username)}</span>
              <span className="text-secondary text-small">{Capitalize(isLogedIn?.role)}</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
          </a>
        </li>
        <div>
          <li className={`${navitem} ${pathname == '/Religio/Dashboard' && 'active'}`} >
            <Link to="/Religio/Dashboard" className="nav-link" >
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon" /></Link>
          </li>
        </div>

        <li className={`${navitem} ${pathname == '/Religio/Congregation' && 'active'}`}>
          <Link to="/Religio/Congregation" className="nav-link" >
            <span className="menu-title">Congregation</span>
            <i className="mdi mdi-bank menu-icon" /></Link>
        </li>

        <li className={`${navitem} ${pathname == '/Religio/Province' && 'active'}`}>
          <Link to="/Religio/Province" className="nav-link" >
            <span className="menu-title">Province</span>
            <i className="mdi mdi-home-plus menu-icon" /></Link>
        </li>

        <li className={`${navitem} ${pathname == '/Religio/ClientRegistration' && 'active'}`}>
          <Link to="/Religio/ClientRegistration" className="nav-link" >
            <span className="menu-title">Client Registration</span>
            <i className="mdi mdi-account-multiple-plus menu-icon" /></Link>
        </li>

        <li className={`${navitem} ${pathname == '/Religio/PaymentStatus' && 'active'}`}>
          <Link to="/Religio/PaymentStatus" className="nav-link" >
            <span className="menu-title">Payment Status</span>
            <i className="mdi mdi-cash-multiple menu-icon" /></Link>
        </li>

        <li className={`${navitem} ${pathname == '/Religio/Tab' && 'active'}`}>
          <Link to="/Religio/Tab" className="nav-link" >
            <span className="menu-title">Project Status</span>
            <i className="mdi mdi-file-document menu-icon" /></Link>
        </li>

        <li className={`${navitem} ${pathname == '/Religio/UsersList' && 'active'}`}>
          <Link to="/Religio/UsersList" className="nav-link" >
            <span className="menu-title">Manage Users</span>
            <i className="mdi mdi-account-circle menu-icon" /></Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
            <span className="menu-title">Home Sections</span>
            <i className="menu-arrow" />
            <i className="mdi mdi-vector-arrange-below menu-icon" />
          </a>
          <div className="collapse" id="general-pages">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link to="/Religio/HomeSections/OurClient" className="nav-link" >
                  <span className="menu-title">Our Client</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Religio/HomeSections/OurCustomerSay" className="nav-link" >
                  <span className="menu-title">Our Customer Says</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav >
  )
}

export default Sidemenubar;