import emailjs from "emailjs-com";

function Demo() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_6qer626", "template_ryb99tm", e.target, "JiVZwOP-Lb26XJ-_f").then(res => {
      alert("email sent sucess");
      e.target.reset();
    }).catch(err => console.log(err));


  }

  return (
    <main>
      {/* Slider Area Start*/}
      <div className="slider-area">
        <div className="slider-active">
          <div className="single-slider slider-padding sky-blue d-flex align-items-center">
          </div>
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
              {/* Shape */}
              <div className="app-shape say-shape">
                <img src="/landing/assets/img/shape/app-shape-left.png" alt="" className="app-shape-left d-none d-xl-block" />
                <img src="/landing/assets/img/shape/say-shape-right.png" alt="" className="app-shape-left-imp d-none d-lg-block" />
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
          </div>
          {/* Available App End*/}
        </div>
      </div>
      <section className="contact-section">
        <div className="container">
          <div className="d-none d-sm-block mb-5 pb-4">
          </div>
          <div className="row">
            <div className="col-lg-8">
              <form className="form-contact contact_form" onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea className="form-control w-100" name="message" id="message" cols={30} rows={9} placeholder=" Enter Message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input className="form-control valid" name="name" id="name" type="text" placeholder="Enter your name" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input className="form-control valid" name="email" id="email" type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input className="form-control" name="subject" id="subject" type="text" placeholder="Enter Subject" />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="button button-contactForm boxed-btn radius">Send</button>
                </div>
              </form>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-home" /></span>
                <div className="media-body">
                  <h3>Bosco Soft Technologies Pvt. Ltd.</h3>
                  <p>No. 231/77, S.H.C Complex. Vaniyambadi Road, Tirupattur District, Tamilnadu, INDIA – 635 601</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-tablet" /></span>
                <div className="media-body">
                  <h3>+91 97860 00436</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-email" /></span>
                <div className="media-body">
                  <h3>cristo@boscosofttech.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Demo;