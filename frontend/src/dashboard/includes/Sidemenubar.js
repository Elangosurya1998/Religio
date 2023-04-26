import { Link, useLocation } from "react-router-dom";
import React from 'react';

function Sidemenubar() {

  const { pathname } = useLocation();

  const navitem = "nav-item";

  console.log(pathname);

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
              <span className="font-weight-bold mb-2">David Grey. H</span>
              <span className="text-secondary text-small">Project Manager</span>
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

        <li className={`${navitem} ${pathname == '/Religio/PaymentStatus' && 'active'}`}>
          <Link to="/Religio/PaymentStatus" className="nav-link" >
            <span className="menu-title">Payment Status</span>
            <i className="mdi mdi-account-multiple-plus menu-icon" /></Link>
        </li>
        <li className={`${navitem} ${pathname == '/Religio/Congregation' && 'active'}`}>
          <Link to="/Religio/Congregation" className="nav-link" >
            <span className="menu-title">Congregation</span>
            <i className="mdi mdi-account-plus menu-icon" /></Link>
        </li>
        <li className={`${navitem} ${pathname == '/Religio/Province' && 'active'}`}>
          <Link to="/Religio/Province" className="nav-link" >
            <span className="menu-title">Province</span>
            <i className="mdi mdi-account-plus menu-icon" /></Link>
        </li>
        <li className={`${navitem} ${pathname == '/register' && 'active'}`}>
          <Link to="/register" className="nav-link" >
            <span className="menu-title">New User Registration</span>
            <i className="mdi mdi-account-plus menu-icon" /></Link>
        </li>
        <li className={`${navitem} ${pathname == '/Religio/ProjectstatusLayouts' && 'active'}`}>
          <Link to="/Religio/ProjectstatusLayouts" className="nav-link" >
            <span className="menu-title">Project Status</span>
            <i className="mdi mdi-file-document menu-icon" /></Link>
        </li>
        <li className={`${navitem} ${pathname == '/Religio/ClientRegistration' && 'active'}`}>
          <Link to="/Religio/ClientRegistration" className="nav-link" >
            <span className="menu-title">Client Registration</span>
            <i className="mdi mdi-account-multiple-plus menu-icon" /></Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
            <span className="menu-title">Sample Pages</span>
            <i className="menu-arrow" />
            <i className="mdi mdi-medical-bag menu-icon" />
          </a>
          <div className="collapse" id="general-pages">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <a className="nav-link" href=""> Blank Page </a></li>
              <li className="nav-item"> <a className="nav-link" href=""> Login </a></li>
              <li className="nav-item"> <a className="nav-link" href=""> Register </a></li>
              <li className="nav-item"> <a className="nav-link" href=""> 404 </a></li>
              <li className="nav-item"> <a className="nav-link" href=""> 500 </a></li>
            </ul>
          </div>
        </li> */}
      </ul>
    </nav >
  )
}

export default Sidemenubar;