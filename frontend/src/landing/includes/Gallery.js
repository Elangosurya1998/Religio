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

function Gallery() {
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
                    <h2 className="sectiontitle">Gallery!</h2>
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
          </div>
        </div>
      </div>
      {/* Our Customer End */}

    </main>
  );
}

export default Gallery;