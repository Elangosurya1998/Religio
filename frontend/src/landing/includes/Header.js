import { Link, useLocation } from "react-router-dom";
import React from 'react';

function Header() {
  const { pathname, hash } = useLocation();

  return (
    <header>
      {/* Header Start */}
      <div className="header-area header-transparrent ">
        <div className="main-header header-sticky">
          <div className="container">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3">
                <div className="logo">
                  <Link to="/Religio/Dashboard"><img src="/logo.png" alt="" /></Link>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-9">
                {/* Main-menu */}
                <div className="main-menu f-right d-none d-lg-block">
                  <nav>
                    <ul id="navigation">

                      <li className={`${hash == "#Home" && 'active'}`}><Link to="/">Home</Link></li>
                      <li className={`${pathname == '/Religio/Aboutus' && 'active'}`}><Link to="/Religio/Aboutus">About us</Link></li>
                      <li className={`${hash == "#Feature" && 'active'}`}><Link to="/#Feature">Feature</Link></li>
                      <li className={`${hash == "#Services" && 'active'}`}><Link to="/#Services">Services</Link></li>
                      <li className={`${pathname == '/Religio/Gallery' || hash == "#Gallery" && 'active'}`}><Link to="/#Gallery">Gallery</Link></li>
                      <li className={`${pathname == '/Religio/Demo' && 'active'}`}><Link to="/Religio/Demo">Demo</Link></li>
                      {/* <li><a href="#">Pages</a>
                          <ul className="submenu">
                            <li><a href="">Blog</a></li>
                            <li><a href="">Blog Details</a></li>
                            <li><a href="">Element</a></li>
                          </ul>
                        </li> */}
                    </ul>
                  </nav>
                </div>
                {/* Mobile-menu */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none" >

                  </div>
                </div>
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