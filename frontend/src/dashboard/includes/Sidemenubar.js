function Sidemenubar() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
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
              <li className="nav-item active">
                <a className="nav-link" href="/Religio/Dashboard">
                  <span className="menu-title">Dashboard</span>
                  <i className="mdi mdi-home menu-icon" />
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="/Religio/ClientRegistration">
                  <span className="menu-title">Client Registration</span>
                  <i className="mdi mdi-account-multiple-plus menu-icon" />
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="/Religio/Congregation">
                  <span className="menu-title">Congregation</span>
                  <i className="mdi mdi-account-plus menu-icon" />
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="/Religio/Province">
                  <span className="menu-title">Province</span>
                  <i className="mdi mdi-account-plus menu-icon" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                  <span className="menu-title">Defaults</span>
                  <i className="menu-arrow" />
                  <i className="mdi mdi-crosshairs-gps menu-icon" />
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className="nav-link" href="/Religio/Congregation">Congregation</a></li>
                    <li className="nav-item"> <a className="nav-link" href="/Religio/Province">Province</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-title">Icons</span>
                  <i className="mdi mdi-contacts menu-icon" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  <span className="menu-title">Forms</span>
                  <i className="mdi mdi-format-list-bulleted menu-icon" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  <span className="menu-title">Charts</span>
                  <i className="mdi mdi-chart-bar menu-icon" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  <span className="menu-title">Tables</span>
                  <i className="mdi mdi-table-large menu-icon" />
                </a>
              </li>
              <li className="nav-item">
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
              </li>
              <li className="nav-item sidebar-actions">
                <span className="nav-link">
                  <div className="border-bottom">
                    <h6 className="font-weight-normal mb-3">Projects</h6>
                  </div>
                  <button className="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a project</button>
                  <div className="mt-4">
                    <div className="border-bottom">
                      <p className="text-secondary">Categories</p>
                    </div>
                    <ul className="gradient-bullet-list mt-4">
                      <li>Free</li>
                      <li>Pro</li>
                    </ul>
                  </div>
                </span>
              </li>
            </ul>
          </nav>
    )
}

export default Sidemenubar;