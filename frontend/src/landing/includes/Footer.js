
function Footer() {
    return (
        <footer>
        {/* Footer Start*/}
        <div className="footer-main">
          <div className="footer-area footer-padding">
            <div className="container">
              <div className="row  justify-content-between">
                <div className="col-lg-3 col-md-4 col-sm-8">
                  <div className="single-footer-caption mb-30">
                    {/* logo */}
                    <div className="footer-logo">
                      <a href=""><img src="./logo.png" alt="" /></a>
                    </div>
                    <div className="footer-tittle">
                      <div className="footer-pera">
                        <p className="info1">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-5">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Quick Links</h4>
                      <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Download</a></li>
                        <li><a href="#">Reviews</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-7">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Support</h4>
                      <ul>
                        <li><a href="#">Report a bug</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms &amp; Conditions</a></li>
                        <li><a href="#">Sitemap</a></li>
                        <li><a href="#">FAQs</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-8">
                  <div className="single-footer-caption mb-50">
                    <div className="footer-tittle">
                      <h4>Newsletter</h4>
                      <div className="footer-pera footer-pera2">
                        <p>Heaven fruitful doesn't over lesser in days. Appear </p>
                      </div>
                      {/* Form */}
                      <div className="footer-form">
                        <div id="mc_embed_signup">
                          
                        </div>
                      </div>
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
      </footer>
    );
}
  
export default Footer;