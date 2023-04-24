import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';


function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('* Email is required')
      .email('* Email is invalid'),
    password: Yup.string()
      .required('* Password is required')
      .min(6, '* Password must be at least 6 characters'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();


  function onSubmitLoginform(data, e) {
    axios.post('http://127.0.0.1:8000/api/Login', data)
      .then(Response => {
        const Logindata = Response.data;
        // console.log(Logindata.role);
        if (Logindata.loginVal == "true") {
          localStorage.setItem("userDetails", JSON.stringify(Logindata));
          Swal.fire({
            title: 'Sign-in success',
            text: 'Logged in successfully',
            icon: 'success',
            confirmButtonColor: 'green'
          }) 
          if(Logindata.role == "admin")
          {
            navigate('/Religio/Dashboard');
          }else{
            navigate('/UserPage');
          }
         
        } else {
          Swal.fire({
            title: "Sign-in Failed",
            text: "please check your username and password!",
            icon: "error",
            button: "try again!",
          });
          navigate('/login');
          e.target.reset();
        }
      }
      );

  }
return (
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
              <a href='/'><center><img src="./logo.png" style={{width:"185px"}}/></center></a>
              </div>
              <form class="pt-3" onSubmit={handleSubmit(onSubmitLoginform)}>
                <div class="form-group">
                  <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" autoComplete='off'  />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div class="form-group">
                  <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" autoComplete='off' />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                {/* <div class="text-center mt-4 font-weight-light"> Don't have an account? <a href="/register" class="text-primary" style={{textDecoration:"none"}}> Register Here</a>
                </div> */}
                <div class="text-center mt-4 font-weight-light"><a href="/" class="text-primary" style={{textDecoration:"none"}}><i class="fa fa-home"> Home</i></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
 export default Login;