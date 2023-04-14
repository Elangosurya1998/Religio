
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
                          <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="subscribe_form relative mail_part" noValidate="true">
                            <input type="email" name="EMAIL" id="newsletter-form-email" placeholder=" Email Address " className="placeholder hide-on-focus" onfocus="this.placeholder = ''" onblur="this.placeholder = ' Email Address '" />
                            <div className="form-icon">
                              <button type="submit" name="submit" id="newsletter-submit" className="email_icon newsletter-submit button-contactForm"><img src="./landing/assets/img/shape/form_icon.png" alt="" /></button>
                            </div>
                            <div className="mt-10 info" />
                          </form>
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
                        Copyright © All rights reserved | <i className="ti-heart" aria-hidden="true" /> by <a href="" target="_blank">Boscosoft Technologies</a>
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