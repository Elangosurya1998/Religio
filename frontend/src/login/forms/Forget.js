import React, { Component} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class ForgetPassword extends Component {

     constructor(){
          super();
          this.state={
               email:'',            
               message:'' 
          }
     } 

      // Forget Password Form Submit Method 
      formSubmit = (e) => {
          e.preventDefault();
          const data={
               email:this.state.email                
          }

          axios.post('http://127.0.0.1:8000/api/forgetpassword',data)
          .then((Response) =>{
            Swal.fire({
              title: 'Reset Link Has been Sent successfully',
              text: 'Check Your Registered Email',
              icon: 'success',
              confirmButtonColor: 'green'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/reset';
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
          
          document.getElementById("resetform").reset();
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
                  <Link to='/'><center><img src="./logo.png" style={{ width: "185px" }} ></img></center></Link>
                </div>
                <form className="onboardForm" onSubmit={this.formSubmit} id='resetform'>
                <h4 className="section-title-login"> FORGET PASSWORD ? </h4>
                  <div className="form-group">
                  <input className="form-control m-2" type="email" placeholder="Enter Your Email"  onChange={(e)=>{this.setState({email:e.target.value})}} required/>
                  </div>
                  <Button type="submit" className="btn btn-block m-2 site-btn-login"> Reset Password </Button>
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

export default ForgetPassword