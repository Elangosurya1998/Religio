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
                      <li><Link to="/">Feature</Link></li>
                      <li><Link to="/">Services</Link></li>
                      <li><Link to="/">Blog</Link></li>
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
                      <li><Link to="/">Contact</Link></li>
                      <li><Link to="/login">Login</Link></li>
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