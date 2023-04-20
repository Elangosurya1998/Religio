
function LoginHeader() {
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
                    <a href="/Religio/Dashboard"><img src="./logo.png" alt="" style={{marginTop:"63px"}} /></a>
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
  
export default LoginHeader;