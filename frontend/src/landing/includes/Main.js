import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import ApiUrl from "../../dashboard/pages/Api/Api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Main() {

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurClient/list`).then((res) => {
      return res.json();
    }).then((resp) => {
      OurClientList(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  const [OurClients, OurClientList] = useState([]);

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
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <h2>How Can We Help Your <br />Province with Religio!</h2>
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
                  <p>Create & Maintain Calendar events.Can set Reminders via Emails and Application. Different types of calendars(Provincial, Institutional, personal)
                    viewed as per permission granted</p>
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
                  <p>Create & Maintain Circular, Generate Circular Content (PDF),Upload Circular, Send Circular to members via Email, Store Circular into Documents, Preview Circular Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Area End */}

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
      <div className="section-padd-top30 sky-blue">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-xl-5 col-lg-5">
              <div className="app-caption">
                <div className="section-tittle section-tittle3">
                  <h2 className="congre-h2 sectiontitle">Digitalized Congregation</h2>
                  <div className="app-btn">
                    <ul className="li-col">
                      <li><i className="fas fa-arrow-right"></i> Home</li>
                      <li><i className="fas fa-arrow-right"></i> Member</li>
                      <li><i className="fas fa-arrow-right"></i> Contacts</li>
                      <li><i className="fas fa-arrow-right"></i> Meeting</li>
                      <li><i className="fas fa-arrow-right"></i> Chronicler</li>
                      <li><i className="fas fa-arrow-right"></i> Circular</li>
                      <li><i className="fas fa-arrow-right"></i> Concern/Issue</li>
                      <li><i className="fas fa-arrow-right"></i> Documents</li>
                      <li><i className="fas fa-arrow-right"></i> Member Transfer</li>
                      <li><i className="fas fa-arrow-right"></i> Directory</li>
                      <li><i className="fas fa-arrow-right"></i> Planner</li>
                      <li><i className="fas fa-arrow-right"></i> Mobile Application</li>
                    </ul>
                    {/* <a href="#" className="app-btn1"><img src="assets/img/shape/app_btn1.png" alt="" /></a>
                    <a href="#" className="app-btn2"><img src="assets/img/shape/app_btn2.png" alt="" /></a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="app-img">
                <img src="/landing/assets/img/shape/available-app-religio.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Customer Start */}
      <div className="section-padd-top30">
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
                    {/* <div class="Marquee">
                      <div class="Marquee-content">
                        <div class="Marquee-tag">1</div>
                        <div class="Marquee-tag">2</div>
                        <div class="Marquee-tag">3</div>
                        <div class="Marquee-tag">4</div>
                        <div class="Marquee-tag">5</div>
                        <div class="Marquee-tag">6</div>
                        <div class="Marquee-tag">7</div>
                        <div class="Marquee-tag">8</div>
                      </div>
                    </div> */}
                    <div className="marquee">
                      <ul className="marquee-content">
                        {
                          OurClients && OurClients.map(item => (
                            <li>
                              <div className="what-img">
                                <img src={"http://localhost:8000/Ourclient/logo/" + item.logo} alt="" />
                              </div>
                            </li>
                          ))
                        }
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

      <section className="sky-blue section-padd-top30">
        <div className="container">
          <div className="row">
            {/* Section Tittle */}
            <div className="d-flex justify-content-center">
              <div className="col-xl-8">
                <div className="section-tittle text-center">
                  <h2>Gallery</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Carousel responsive={responsive}>
              <div><img src="/landing/assets/img/gallerysection/1.png" alt="" /></div>
              <div><img src="/landing/assets/img/gallerysection/2.png" alt="" /></div>
              <div><img src="/landing/assets/img/gallerysection/3.png" alt="" /></div>
              <div><img src="/landing/assets/img/gallerysection/4.png" alt="" /></div>
              {/* <div><img src="/landing/assets/img/gallerysection/5.png" alt="" /></div> */}
              <div><img src="/landing/assets/img/gallerysection/6.png" alt="" /></div>
              <div><img src="/landing/assets/img/gallerysection/7.png" alt="" /></div>
            </Carousel>
          </div>
          <br />
          <div className="row d-flex justify-content-between">
            <div className="col-xl-12 col-lg-12">
              <div className="app-caption">
                <center>
                  <div className="button-group-area">
                    <Link to="/Religio/Gallery" className="genric-btn success radius">More</Link>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <h2 className="ourvision">Get started with Religio today to make your province Digital</h2>
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
                  <Link to="/Religio/Demo" className="genric-btn success radius">Request for Demo</Link>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      {/* Available App End*/}


    </main >
  );
}

export default Main;