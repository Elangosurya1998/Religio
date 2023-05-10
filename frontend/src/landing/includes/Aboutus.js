function Aboutus() {
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
                                        <h2 className="sectiontitle">About Us!</h2>
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
                                            <h2 className="ourvision">IT And IT-Enabled Solution Provider For Corporates And Service Sectors</h2>
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
                            <p>In our industrial orchestration of technologies, tools, processes and methods, we strive to be on level with our professional philosophy of “customer-friendly investments”.</p>
                            <h3>Boscosoft is known for</h3>
                            <ul style={{ 'padding-left': '44px' }}>
                                <li><i className="mdi mdi-fast-forward-outline"></i>&nbsp; Developing complete feature rich and scalable ERP solutions as per need and requirement.</li>
                                <li><i className="mdi mdi-fast-forward-outline"></i>&nbsp; Innovative products and excellent support that meet or exceed Client's expectations.</li>
                                <li><i className="mdi mdi-fast-forward-outline"></i>&nbsp; Timely delivery.</li>
                                <li><i className="mdi mdi-fast-forward-outline"></i>&nbsp; Products at affordable price.</li>
                                <li><i className="mdi mdi-fast-forward-outline"></i>&nbsp; Unassailable support.</li>
                            </ul>
                        </div>
                        <br />
                        <div className="row justify-content-center">
                            <img src="/landing/assets/img/about/Vision.jpg" alt="" className="app-shape-left d-none d-xl-block" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Our Customer End */}

        </main>
    );
}

export default Aboutus;