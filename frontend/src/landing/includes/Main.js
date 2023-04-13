
function Main() {
    return (
        <main>
        {/* Slider Area Start*/}
        <div className="slider-area ">
          <div className="slider-active">
            <div className="single-slider slider-height slider-padding sky-blue d-flex align-items-center">
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-6 col-md-9 ">
                    <div className="hero__caption">
                      <span data-animation="fadeInUp" data-delay=".4s">App Landing Page</span>
                      <h1 data-animation="fadeInUp" data-delay=".6s">Get things done<br />with Appco</h1>
                      <p data-animation="fadeInUp" data-delay=".8s">Dorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusm tempor incididunt ulabore et dolore magna aliqua.</p>
                      {/* Slider btn */}
                      <div className="slider-btns">
                        {/* Hero-btn */}
                        {/* <a data-animation="fadeInLeft" data-delay="1.0s" href="industries.html" className="btn radius-btn">Download</a> */}
                        {/* Video Btn */}
                        {/* <a data-animation="fadeInRight" data-delay="1.0s" className="popup-video video-btn ani-btn" href="https://www.youtube.com/watch?v=1aP-TXUpNoU"><i className="fas fa-play" /></a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="hero__img d-none d-lg-block f-right" data-animation="fadeInRight" data-delay="1s">
                      <img src="./landing/assets/img/hero/hero_right.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
        {/* Slider Area End */}
        {/* Best Features Start */}
        <section className="best-features-area section-padd4">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-xl-8 col-lg-10">
                {/* Section Tittle */}
                <div className="row">
                  <div className="col-lg-10 col-md-10">
                    <div className="section-tittle">
                      <h2>Some of the best features Of Our App!</h2>
                    </div>
                  </div>
                </div>
                {/* Section caption */}
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="single-features mb-70">
                      <div className="features-icon">
                        <span className="flaticon-support" />
                      </div>
                      <div className="features-caption">
                        <h3>Easy to Costomize</h3>
                        <p>Aorem psum olorsit amet ectetur adipiscing elit, sed dov.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="single-features mb-70">
                      <div className="features-icon">
                        <span className="flaticon-support" />
                      </div>
                      <div className="features-caption">
                        <h3>Extreme Security</h3>
                        <p>Aorem psum olorsit amet ectetur adipiscing elit, sed dov.</p>
                      </div>
                    </div>
                  </div> 
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="single-features mb-70">
                      <div className="features-icon">
                        <span className="flaticon-support" />
                      </div>
                      <div className="features-caption">
                        <h3>Customer Support</h3>
                        <p>Aorem psum olorsit amet ectetur adipiscing elit, sed dov.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="single-features mb-70">
                      <div className="features-icon">
                        <span className="flaticon-support" />
                      </div>
                      <div className="features-caption">
                        <h3>Creative Design</h3>
                        <p>Aorem psum olorsit amet ectetur adipiscing elit, sed dov.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Shpe */}
          <div className="features-shpae d-none d-lg-block">
            <img src="./landing/assets/img/shape/best-features.png" alt="" />
          </div>
        </section>
        {/* Best Features End */}

        {/* Services Area Start */}
        <section className="service-area sky-blue section-padding2">
          <div className="container">
            {/* Section Tittle */}
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="section-tittle text-center">
                  <h2>How Can We HelpYour<br />with Appco!</h2>
                </div>
              </div>
            </div>
            {/* Section caption */}
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption text-center mb-30">
                  <div className="service-icon">
                    <span className="flaticon-businessman" />
                  </div> 
                  <div className="service-cap">
                    <h4><a href="#">Easily Manage</a></h4>
                    <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption active text-center mb-30">
                  <div className="service-icon">
                    <span className="flaticon-pay" />
                  </div> 
                  <div className="service-cap">
                    <h4><a href="#">Get Payments Easily</a></h4>
                    <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                  </div>
                </div>
              </div> 
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption text-center mb-30">
                  <div className="service-icon">
                    <span className="flaticon-plane" />
                  </div> 
                  <div className="service-cap">
                    <h4><a href="#">Quick Messaging</a></h4>
                    <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Area End */}

        {/* Applic App Start */}
        <div className="applic-apps section-padding2">
          <div className="container-fluid">
            <div className="row">
              {/* slider Heading */}
              <div className="col-xl-4 col-lg-4 col-md-8">
                <div className="single-cases-info mb-30">
                  <h3>Applic Apps<br /> Screenshot</h3>
                  <p>Lorem ipsum dolor sit amet, consecadipiscing elit, sed do eiusmod tempor incididunt ut ore et dolore magna aliqua. Quis ipsum suspendisse gravida. Risus commodo viverra maecenasan lacus vel facilisis. </p>
                </div>
              </div>
              {/* OwL */}
              <div className="col-xl-8 col-lg-8 col-md-col-md-7">
                <div className="app-active owl-carousel"> 
                  <div className="single-cases-img">
                    <img src="./landing/assets/img/gallery/App1.png" alt="" />
                  </div>
                  <div className="single-cases-img">
                    <img src="./landing/assets/img/gallery/App2.png" alt="" />
                  </div>
                  <div className="single-cases-img">
                    <img src="./landing/assets/img/gallery/App3.png" alt="" />
                  </div>
                  <div className="single-cases-img">
                    <img src="./landing/assets/img/gallery/App2.png" alt="" />
                  </div>
                  <div className="single-cases-img">
                    <img src="./landing/assets/img/gallery/App1.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Applic App End */}

        {/* Best Pricing Start */}
        <section className="best-pricing pricing-padding" data-background="./landing/assets/img/gallery/best_pricingbg.jpg">
          <div className="container">
            {/* Section Tittle */}
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="section-tittle section-tittle2 text-center">
                  <h2>Choose Your Very Best Pricing Plan.</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Best Pricing End */}
        
        {/* Pricing Card Start */}
        <div className="pricing-card-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="single-card text-center mb-30">
                  <div className="card-top">
                    <span>2 Years</span>
                    <h4>$05 <span>/ month</span></h4>
                  </div>
                  <div className="card-bottom">
                    <ul>
                      <li>Increase traffic 50%</li>
                      <li>E-mail support</li>
                      <li>10 Free Optimization</li>
                      <li>24/7  support</li>
                    </ul>
                    <a href="services.html" className="btn card-btn1">Get Started</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="single-card  text-center mb-30">
                  <div className="card-top">
                    <span>2 Years</span>
                    <h4>$05 <span>/ month</span></h4>
                  </div>
                  <div className="card-bottom">
                    <ul>
                      <li>Increase traffic 50%</li>
                      <li>E-mail support</li>
                      <li>10 Free Optimization</li>
                      <li>24/7  support</li>
                    </ul>
                    <a href="services.html" className="btn card-btn1">Get Started</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="single-card text-center mb-30">
                  <div className="card-top">
                    <span>2 Years</span>
                    <h4>$05 <span>/ month</span></h4>
                  </div>
                  <div className="card-bottom">
                    <ul>
                      <li>Increase traffic 50%</li>
                      <li>E-mail support</li>
                      <li>10 Free Optimization</li>
                      <li>24/7  support</li>
                    </ul>
                    <a href="services.html" className="btn card-btn1">Get Started</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pricing Card End */}

        {/* Our Customer Start */}
        <div className="our-customer section-padd-top30">
          <div className="container-fluid">
            <div className="our-customer-wrapper">
              {/* Section Tittle */}
              <div className="row d-flex justify-content-center">
                <div className="col-xl-8">
                  <div className="section-tittle text-center">
                    <h2>What Our Customers<br /> Have to Say</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="customar-active dot-style d-flex dot-style">
                    <div className="single-customer mb-100">
                      <div className="what-img">
                        <img src="./landing/assets/img/shape/man1.png" alt="" />
                      </div>
                      <div className="what-cap">
                        <h4><a href="#">Welcome To The Best Model  Winner Contest</a></h4>
                        <p>Utenim ad minim veniam quisnostrud exercitation ullamcolabor nisiut aliquip ex ea commodo consequat duis aute irure dolor in represse.</p>
                      </div>
                    </div>
                    <div className="single-customer mb-100">
                      <div className="what-img">
                        <img src="./landing/assets/img/shape/man2.png" alt="" />
                      </div>
                      <div className="what-cap">
                        <h4><a href="#">Welcome To The Best Model  Winner Contest</a></h4>
                        <p>Utenim ad minim veniam quisnostrud exercitation ullamcolabor nisiut aliquip ex ea commodo consequat duis aute irure dolor in represse.</p>
                      </div>
                    </div>
                    <div className="single-customer mb-100">
                      <div className="what-img">
                        <img src="./landing/assets/img/shape/man3.png" alt="" />
                      </div>
                      <div className="what-cap">
                        <h4><a href="#">Welcome To The Best Model  Winner Contest</a></h4>
                        <p>Utenim ad minim veniam quisnostrud exercitation ullamcolabor nisiut aliquip ex ea commodo consequat duis aute irure dolor in represse.</p>
                      </div>
                    </div>
                    <div className="single-customer mb-100">
                      <div className="what-img">
                        <img src="./landing/assets/img/shape/man2.png" alt="" />
                      </div>
                      <div className="what-cap">
                        <h4><a href="#">Welcome To The Best Model  Winner Contest</a></h4>
                        <p>Utenim ad minim veniam quisnostrud exercitation ullamcolabor nisiut aliquip ex ea commodo consequat duis aute irure dolor in represse.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>           
        {/* Our Customer End */}
        
        {/* Available App  Start*/}
        <div className="available-app-area">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-xl-5 col-lg-6">
                <div className="app-caption">
                  <div className="section-tittle section-tittle3">
                    <h2>Our App Available For Any Device Download now</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore fug.</p>
                    <div className="app-btn">
                      <a href="#" className="app-btn1"><img src="./landing/assets/img/shape/app_btn1.png" alt="" /></a>
                      <a href="#" className="app-btn2"><img src="./landing/assets/img/shape/app_btn2.png" alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="app-img">
                  <img src="./landing/assets/img/shape/available-app.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* Shape */}
          <div className="app-shape">
            <img src="./landing/assets/img/shape/app-shape-top.png" alt="" className="app-shape-top heartbeat d-none d-lg-block" />
            <img src="./landing/assets/img/shape/app-shape-left.png" alt="" className="app-shape-left d-none d-xl-block" />
            {/* <img src="./landing/assets/img/shape/app-shape-right.png" alt="" class="app-shape-right bounce-animate "> */}
          </div>
        </div>
        {/* Available App End*/}
        
        {/* Say Something Start */}
        <div className="say-something-aera pt-90 pb-90 fix">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="offset-xl-1 offset-lg-1 col-xl-5 col-lg-5">
                <div className="say-something-cap">
                  <h2>Say Hello To The Collaboration Hub.</h2>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3">
                <div className="say-btn">
                  <a href="#" className="btn radius-btn">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
          {/* shape */}
          <div className="say-shape">
            <img src="./landing/assets/img/shape/say-shape-left.png" alt="" className="say-shape1 rotateme d-none d-xl-block" />
            <img src="./landing/assets/img/shape/say-shape-right.png" alt="" className="say-shape2 d-none d-lg-block" />
          </div>
        </div>
        {/* Say Something End */}
      </main>
    );
}
  
export default Main;