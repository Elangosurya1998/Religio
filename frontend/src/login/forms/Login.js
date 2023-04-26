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

        if (Logindata.loginVal == "true") {

          localStorage.setItem("userDetails", JSON.stringify(Logindata.user));

          Swal.fire({
            title: 'Sign-in success',
            text: 'Logged in successfully',
            icon: 'success',
            confirmButtonColor: 'green'
          })

          const userData = Logindata.user;

          if (userData.role == "admin") {

            navigate('/Religio/Dashboard');

          } else {

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
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <a href='/'><center><img src="./logo.png" style={{ width: "185px" }} /></center></a>
                </div>
                <form className="pt-3" onSubmit={handleSubmit(onSubmitLoginform)}>
                  <div className="form-group">
                    <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" autoComplete='off' />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>
                  <div className="form-group">
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" autoComplete='off' />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                  </div>
                  {/* <div className="text-center mt-4 font-weight-light"> Don't have an account? <a href="/register" className="text-primary" style={{textDecoration:"none"}}> Register Here</a>
                </div> */}
                  <div className="text-center mt-4 font-weight-light"><a href="/" className="text-primary" style={{ textDecoration: "none" }}><i className="fa fa-home"> Home</i></a>
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