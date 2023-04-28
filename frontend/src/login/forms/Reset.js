import React, { Component} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


export class ResetPassword extends Component {

     constructor(){
          super(); 
          this.state={
               token:'',
               email:'',
               password:'',
               password_confirmation:'',
              
          }
     } 


      // Reset Form Submit Method 
      formSubmit = (e) => {
          e.preventDefault();
          const data={
               token:this.state.token,
               email:this.state.email,
               password:this.state.password,
               password_confirmation:this.state.password_confirmation
          }


            axios.post('http://127.0.0.1:8000/api/resetpassword',data)
            .then((Response) =>{
              Swal.fire({
                title: 'Password Has been Changed successfully',
                icon: 'success',
                confirmButtonColor: 'green'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/login';
                }
              })
            }).catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: err.message
              })
            })
              document.getElementById("fromreset").reset();

     }


     render() {
          return (

            <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
              <div className="content-wrapper d-flex align-items-center auth">
                <div className="row flex-grow">
                  <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light text-left p-5">
                      <div className="brand-logo">
                        <Link to='/'><center><img src="./logo.png" style={{ width: "185px" }} /></center></Link>
                      </div>
                      <form className="onboardForm"  onSubmit={this.formSubmit} id="fromreset" >
                      <h4 className="section-title-login"> RESET PASSWORD </h4>
                        <div className="form-group">
                        <input className="form-control m-2" type="text" placeholder="Enter Your Pin Code" onChange={(e)=>{this.setState({token:e.target.value})}} />
                        </div>
                        <div className="form-group">
                        <input className="form-control m-2" type="email" placeholder="Enter Your Email"  onChange={(e)=>{this.setState({email:e.target.value})}} />
                        </div>
                        <div className="form-group">
                        <input className="form-control m-2" type="password" placeholder="Your New Password"  onChange={(e)=>{this.setState({password:e.target.value})}} />
                        </div>
                        <div className="form-group">
                        <input className="form-control m-2" type="password" placeholder="Confirm Your Password"  onChange={(e)=>{this.setState({password_confirmation:e.target.value})}} />
                        </div>
                        <div className="mt-3">
                        <Button type="submit" className="btn btn-block m-2 site-btn-login"> Reset Password </Button> 
                        </div>
                        <div className="text-center mt-4 font-weight-light"><Link to="/" className="text-primary" style={{ textDecoration: "none" }}><i className="fa fa-home"> Home</i></Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

          )
     }
}

export default ResetPassword




