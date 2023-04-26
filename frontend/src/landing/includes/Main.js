import { Link } from "react-router-dom";

function Main() {
  return (
    <main>
      {/* Slider Area Start*/}
      <div className="slider-area" id="Home">
        <div className="slider-active">
          <div className="single-slider slider-height slider-padding sky-blue d-flex align-items-center">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-lg-6 col-md-9 ">
                  <div className="hero__caption">
                    <div className="section-tittle">
                      <h2>Religio</h2>
                    </div>
                    <h1 data-animation="fadeInUp" data-delay=".6s">Integrated Software Solution For Managing & Administration Of Congregation & Province</h1>
                    <p data-animation="fadeInUp" data-delay=".8s">User-friendly software tool for the religious head of a religious institute, province secretary, institute/community heads and for all province members - to manage all communications (circular, email, meetings), create records (chronicles, concerns), maintain member critical and personal information, assignments, history, institution/community information, planning, reporting and archiving. </p>
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
      <section className="best-features-area section-padd4" id="Feature">
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
                  <div className="single-features mb-30">
                    <div className="features-icon">
                      <span className="flaticon-costomize" />
                    </div>
                    <div className="features-caption">
                      <h3>Easy Member Update</h3>
                      <p>Create & Maintain Member Profile (Education, Sacraments, Profession, Formation, Holy Order etc…).</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="single-features mb-30">
                    <div className="features-icon">
                      <span><i className="fas fa-exchange-alt"></i></span>
                    </div>
                    <div className="features-caption">
                      <h3>Transfers Made Easy</h3>
                      <p>Transfer can be done in a single click.</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="single-features mb-30">
                    <div className="features-icon">
                      <span><i className="fas fa-recycle"></i></span>
                    </div>
                    <div className="features-caption">
                      <h3>Circular Management</h3>
                      <p>Circular’s sending them through our application.</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="single-features mb-30">
                    <div className="features-icon">
                      <span><i className="fas fa-calendar"></i></span>
                    </div>
                    <div className="features-caption">
                      <h3>Calendar / Events</h3>
                      <p>Publishing Calendar Events sending them through our application.</p>
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

      {/* Available App  Start*/}
      <div className="available-app-area">
        <div className="container">
          {/* Section Tittle */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="section-tittle text-center">
                <h2 className="sectiontitle">Our Vision</h2>
              </div>
            </div>
          </div>
          {/* Shape */}
          <div className="app-shape say-shape">
            <img src="./landing/assets/img/shape/app-shape-left.png" alt="" className="app-shape-left d-none d-xl-block" />
            <img src="./landing/assets/img/shape/say-shape-right.png" alt="" className="app-shape-left-imp d-none d-lg-block" />
          </div>
          {/* Section caption */}
          <div className="row d-flex justify-content-between">
            <div className="col-xl-12 col-lg-12">
              <div className="app-caption">
                <div className="section-tittle section-tittle3">
                  <h2 className="ourvision">“Congregation Sans Paper” A paperless technology driver back office for an administration.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Available App End*/}

      {/* Services Area Start */}
      <section className="service-area sky-blue section-padding2" id="Services">
        <div className="container">
          {/* Section Tittle */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="section-tittle text-center">
                <h2>How Can We Help Your<br />Province with Religio!</h2>
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
                  <h4><a href="#">Members Info Online</a></h4>
                  <p>Maintain Member Profile (Education, Sacraments, Profession, Formation, Holy Order etc…). Member profile with more than 200 data points that can be viewed online or downloaded in PDF/Excel </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="services-caption text-center mb-30">
                <div className="service-icon">
                  <span className="flaticon-pay" />
                </div>
                <div className="service-cap">
                  <h4><a href="#">Calendar / Events</a></h4>
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
                  <h4><a href="#">Circular Management</a></h4>
                  <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Area End */}

      {/* Applic App Start */}
      {/* <div className="applic-apps section-padding2" id="Gallery">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-8">
              <div className="single-cases-info mb-30">
                <h3>Application Apps<br /> Screenshot</h3>
                <p>Lorem ipsum dolor sit amet, consecadipiscing elit, sed do eiusmod tempor incididunt ut ore et dolore magna aliqua. Quis ipsum suspendisse gravida. Risus commodo viverra maecenasan lacus vel facilisis. </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="row d-flex justify-content-between">
                <div className="app-img">
                  <img src="./landing/assets/img/shape/available-app.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-7">
              <div className="app-active owl-carousel">
                <div className="single-cases-img">
                  <img src="./landing/assets/img/gallery/App1.png" alt="" />
                </div>
                <div className="single-cases-img">

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
      </div> */}
      {/* Applic App End */}


      {/* Our Customer Start */}
      <div className="our-customer  section-padd-top30">
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
                  <div className="row">
                    <div className="col-md-4 col-lg-4 col-sm-12">
                      <div className="single-customer ">
                        <div className="what-img">
                          <img src="./landing/assets/img/shape/man2.png" alt="" />
                        </div>
                        <div className="what-cap">
                          <h4><a href="#">Welcome To The Best Model  Winner Contest</a></h4>
                          <p>Utenim ad minim veniam quisnostrud exercitation ullamcolabor nisiut aliquip ex ea commodo consequat duis aute irure dolor in represse.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <div className="single-customer">
                        <div className="what-img">
                          <img src="./landing/assets/img/shape/man3.png" alt="" />
                        </div>
                        <div className="what-cap">
                          <h4><a href="#">Welcome To The Best Model  Winner Contest</a></h4>
                          <p>Utenim ad minim veniam quisnostrud exercitation ullamcolabor nisiut aliquip ex ea commodo consequat duis aute irure dolor in represse.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-sm-12">
                      <div className="single-customer">
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
        </div>
      </div>
      {/* Our Customer End */}

      {/* Our Customer Start */}
      <div className="our-customer sky-blue section-padd-top30">
        <div className="container-fluid">
          <div className="our-customer-wrapper">
            {/* Section Tittle */}
            <div className="d-flex justify-content-center">
              <div className="col-xl-8">
                <div className="section-tittle text-center">
                  <h2>Our Clients</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="customar-active dot-style d-flex dot-style">
                  <div>
                    <div className="marquee">
                      <ul className="marquee-content">
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </li>
                        <li>
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="single-customer mb-100">
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </div>
                        <div className="single-customer mb-100">
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man3.png" alt="" />
                          </div>
                        </div>
                        <div className="single-customer mb-100">
                          <div className="what-img">
                            <img src="./landing/assets/img/shape/man2.png" alt="" />
                          </div>
                        </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Customer End */}
      {/* Our Customer Start */}
      <div className="our-customer section-padd-top30">
        <div className="container-fluid">
          <div className="our-customer-wrapper">
            {/* Section Tittle */}
            <div className="d-flex justify-content-center">
              <div className="col-xl-8">
                <div className="section-tittle text-center">
                  <h2>Blog</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Accordion Item #1
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      Accordion Item #2
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                      Accordion Item #3
                    </button>
                  </h2>
                  <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row d-flex justify-content-between">
          <div className="col-xl-12 col-lg-12">
            <div className="app-caption">
              <center>
                <div className="button-group-area">
                  <Link to="/Religio/Blog" className="genric-btn success radius"><i className="fas fa-blog"></i>&nbsp; More</Link>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      {/* Our Customer End */}

      {/* Available App  Start*/}
      <div className="available-app-area" id="Demo">
        <div className="container">
          {/* Section Tittle */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="section-tittle text-center">
                <h2 className="sectiontitle">Get Connected!</h2>
              </div>
            </div>
          </div>
          {/* Section caption */}
          <div className="row d-flex justify-content-between">
            <div className="col-xl-12 col-lg-12">
              <div className="app-caption">
                <div className="section-tittle section-tittle3">
                  <center>
                    <h2 className="ourvision">Get started with Religio today</h2>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Shape */}
        <div className="app-shape say-shape">
          <img src="./landing/assets/img/shape/app-shape-left.png" alt="" className="app-shape-left d-none d-xl-block" />
          <img src="./landing/assets/img/shape/say-shape-right.png" alt="" className="app-shape-left-imp d-none d-lg-block" />
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-xl-12 col-lg-12">
            <div className="app-caption">
              <center>
                <div className="button-group-area">
                  <Link to="/Religio/Demo" className="genric-btn success radius"><i className="fas fa-shopping-cart"></i>&nbsp; Demo</Link>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      {/* Available App End*/}


    </main>
  );
}

export default Main;