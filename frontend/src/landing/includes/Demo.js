import axios from 'axios';
import ApiUrl from '../../dashboard/pages/Api/Api';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import './app.css';

function Demo() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const onSubmitform = (data, e) => {
    e.preventDefault();
    console.log(data);
    axios.post(`${ApiUrl}/send-email`, data)
      .then(response => {
        Swal.fire({
          title: 'Email Sent Success',
          text: 'Your Feedback Sent Successfully',
          icon: 'success',
          confirmButtonColor: 'green'
        })
        e.target.reset();
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err.message
        })
      })

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
                        <h2 className="ourvision">Get started with Religio today to make your province Digital</h2>
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
              <form className="form-contact contact_form" id='myForm' onSubmit={handleSubmit(onSubmitform)}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Name <span style={{ color: "red" }}>*</span></label>
                      <input className="form-control valid"  {...register("name", { required: true })}
                        aria-invalid={errors?.name ? "true" : "false"} name="name" id="name" type="text" placeholder="Enter your name" autoComplete='off' />
                      {errors?.name?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Name is required *</label></div>}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Email <span style={{ color: "red" }}>*</span></label>
                      <input className="form-control valid" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                        aria-invalid={errors?.email ? "true" : "false"} name="email" id="email" type="email" placeholder="Email" autoComplete='off' />
                      {errors?.email?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Email is required *</label></div>}
                      {errors?.email?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Invalid email address *</label></div>}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Province <span style={{ color: "red" }}>*</span></label>
                      <input className="form-control"  {...register("province", { required: true })}
                        aria-invalid={errors?.province ? "true" : "false"} name="province" id="province" type="text" placeholder="Enter Province" autoComplete='off' />
                      {errors?.province?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Province Name is required *</label></div>}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Mobile Number <span style={{ color: "red" }}>*</span></label>
                      <input className="form-control" {...register("mobile", { required: true, minLength: 10, maxLength: 12, pattern: /^[]?\d*(?:[.,]\d*)?$/ })}
                        aria-invalid={errors?.mobile ? "true" : "false"} name="mobile" id="mobile" type="tel" placeholder="Enter Mobile Number" autoComplete='off' />
                      {errors?.mobile?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Mobile Number is required *</label></div>}
                      {errors?.mobile?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Mobile Number can contain only Numbers *</label></div>}
                      {errors?.mobile?.type === "minLength" && <div className='text-danger text_error '><label className="errlabel">Mobile Number should be minimum Numbers 10 *</label></div>}
                      {errors?.mobile?.type === "maxLength" && <div className='text-danger text_error '><label className="errlabel">Mobile Number should be  maximum Numbers12 *</label></div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Message <span style={{ color: "red" }}>*</span></label>
                      <textarea className="form-control w-100" {...register("message", { required: true })}
                        aria-invalid={errors?.message ? "true" : "false"} name="message" id="message" cols={30} rows={9} placeholder=" Enter Message" defaultValue={""} autoComplete='off' />
                      {errors?.message?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Message is required *</label></div>}
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button type="submit" id="submitbtn" className="button button-contactForm boxed-btn radius">Send</button>
                </div>
              </form>
            </div>
            <div className="col-lg-3 offset-lg-1">
              {/* <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-home" /></span>
                <div className="media-body">
                  <h3>Bosco Soft Technologies Pvt. Ltd.</h3>
                  <p>No. 231/77, S.H.C Complex. Vaniyambadi Road, Tirupattur District, Tamilnadu, INDIA – 635 601</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-tablet" /></span>
                <div className="media-body">
                  <h3>+91 9626 800 800</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-email" /></span>
                <div className="media-body">
                  <h3>info@boscosofttech.com</h3>
                </div>
              </div> */}
              <h4>Customer Support : 24/7</h4>
              <br />
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-tablet" /></span>
                <div className="media-body">
                  <h3>+91 97860 00436</h3>
                  {/* <p>Mon to Fri 9am to 6pm</p> */}
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-email" /></span>
                <div className="media-body">
                  <h3>cristo@boscosofttech.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
              <hr />
              <h4>For Demo</h4>
              <br />
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-tablet" /></span>
                <div className="media-body">
                  <h3>+91 96291 46030</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-email" /></span>
                <div className="media-body">
                  <h3>imman@boscosofttech.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-12 col-xl-12 col-sm-12'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d973.7984394108482!2d78.56892422996252!3d12.503312868207134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac5479d7985c59%3A0x87189b52ee2bb632!2sBosco%20Soft%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1683611558810!5m2!1sen!2sin"
                width="100%"
                height="200px"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Demo;