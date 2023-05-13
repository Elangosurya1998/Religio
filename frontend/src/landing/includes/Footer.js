
function Footer() {
  return (
    <footer>
      {/* Footer Start*/}
      <div className="footer-main ">
        <div className="footer-area footer-padding">
          <div className="container">
            <div className="row  justify-content-between">
              <div className="col-lg-4 col-md-4 col-sm-8">
                <div className="single-footer-caption mb-30">
                  {/* logo */}
                  <div className="footer-logo">
                    <a href=""><img src="/logo.png" alt="" /></a>
                  </div>
                  <div className="footer-tittle">
                    <div className="footer-pera">
                      <p className="info1">Greetings to you from Boscosoft Technologies Pvt. Ltd. We are a corporate software company established by the Salesians of Don Bosco in India. The Company provides IT support to organizations that foster Knowledge Society, with special reference to Organizations of the Church, Education, Health care, Accounting, Micro Finance and NGOs.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-5">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Quick Links</h4>
                    <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/#Feature">Feature</a></li>
                      <li><a href="/#Services">Service</a></li>
                      <li><a href="/Religio/Blog">Blog</a></li>
                      <li><a href="/Religio/Demo">Demo</a></li>
                      <li><a href="/Religio/Aboutus">About us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-8">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Address</h4>
                    <ul>
                      <li><p style={{ "fontSize": "0.786rem" }}><i className="fas fa-building"></i>&nbsp; Bosco Soft Technologies Pvt. Ltd,<br></br>No. 231/77, S.H.C Complex. Vaniyambadi Road, <br></br>Tirupattur District, Tamilnadu,<br></br> INDIA – 635 601</p></li>
                      <li><a href="mailto:info@boscosofttech.com"><i className="fas fa-envelope"></i>&nbsp; info@boscosofttech.com</a></li>
                      <li><i className="fas fa-phone"></i>&nbsp; +91 9626 800 800</li>
                    </ul>
                    {/* <h4>Customer Support : 24/7</h4>
                    <ul>
                      <li><a href="mailto:cristo@boscosofttech.com"><i className="fas fa-envelope"></i>&nbsp; cristo@boscosofttech.com</a></li>
                      <li><i className="fas fa-phone"></i>&nbsp; +91 97860 00436</li>
                    </ul>
                    <br></br>
                    <h4>For Demo</h4>
                    <ul>
                      <li><a href="mailto:imman@boscosofttech.com"><i className="fas fa-envelope"></i>&nbsp; imman@boscosofttech.com</a></li>
                      <li><i className="fas fa-phone"></i>&nbsp; +91 96291 46030</li>
                    </ul> */}
                  </div>
                </div>
              </div>
              {/* Copy-Right */}
              <div className="row align-items-center">
                <div className="col-xl-12 ">
                  <div className="footer-copy-right">
                    <p>
                      Copyright © All rights reserved | by <a href="" target="_blank">Boscosoft Technologies</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End*/}
    </footer >
  );
}

export default Footer;