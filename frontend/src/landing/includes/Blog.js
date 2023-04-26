import emailjs from "emailjs-com";

function Blog() {


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
                    <h2 className="sectiontitle">Blog!</h2>
                  </div>
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
          {/* Available App End*/}

        </div>
      </div>
      {/* Our Customer Start */}
      <div className="our-customer section-padd-top30">
        <div className="container-fluid">
          <div className="our-customer-wrapper">
            {/* Section Tittle */}
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
      </div>
      {/* Our Customer End */}

    </main>
  );
}

export default Blog;