import { Link, useLocation } from "react-router-dom";
import React from 'react';

function Header() {
  const { pathname } = useLocation();

  return (
    <header>
      {/* Header Start */}
      <div className="header-area header-transparrent ">
        <div className="main-header header-sticky">
          <div className="container">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-2 col-md-2">
                <div className="logo">
                  <a href="/login"><img src="/logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10">
                {/* Main-menu */}
                <div className="main-menu f-right d-none d-lg-block">
                  <nav>
                    <ul id="navigation">

                      <li ><Link to="/">Home</Link></li>
                      <li ><Link to="/#Feature">Feature</Link></li>
                      <li ><Link to="/#Services">Services</Link></li>
                      <li className={`${pathname == '/Religio/Blog' && 'active'}`}><Link to="/Religio/Blog">Blog</Link></li>
                      <li className={`${pathname == '/Religio/Demo' && 'active'}`}><Link to="/Religio/Demo">Demo</Link></li>
                      {/* <li><a href="#">Pages</a>
                          <ul className="submenu">
                            <li><a href="">Blog</a></li>
                            <li><a href="">Blog Details</a></li>
                            <li><a href="">Element</a></li>
                          </ul>
                        </li> */}
                      <li><Link to="/">Contact</Link></li>
                      {/* <li><Link to="/login">Login</Link></li> */}
                    </ul>
                  </nav>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none" >
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}
    </header >
  );
}

export default Header;