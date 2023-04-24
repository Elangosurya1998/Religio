import { Link } from "react-router-dom";

function Header() {
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
                  <a href="/Religio/Dashboard"><img src="/logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10">
                {/* Main-menu */}
                <div className="main-menu f-right d-none d-lg-block">
                  <nav>
                    <ul id="navigation">

                      <li><Link to="/">Home</Link></li>
                      {/* <li className="active"><a href="index.html"> Home</a></li> */}
                      <li><a href="#Feature">Feature</a></li>
                      <li><a href="#Services">Services</a></li>
                      {/* <li><a href="#Gallery">Gallery</a></li> */}
                      <li><a href="#Blog">Blog</a></li>
                      <li>
                        <Link to="/Religio/Demo">Demo</Link>

                      </li>
                      {/* <li><a href="#">Pages</a>
                          <ul className="submenu">
                            <li><a href="">Blog</a></li>
                            <li><a href="">Blog Details</a></li>
                            <li><a href="">Element</a></li>
                          </ul>
                        </li> */}
                        <Link to="">Contact</Link>
                        {/* <li><a href="/login">Login</a></li> */}
                      </ul>
                    </nav>
                </div>
                {/* Mobile Menu */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none" />
                </div>
              </div>
              {/* Mobile Menu */}
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}
    </header>
  );
}

export default Header;