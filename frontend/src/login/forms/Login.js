import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoginHeader from '../../landing/includes/LoginHeader';



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
          localStorage.setItem("userDetails", JSON.stringify(Logindata));
          Swal.fire({
            title: 'Sign-in success',
            text: 'Logged in successfully',
            icon: 'success',
            confirmButtonColor: 'green'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/Religio/Dashboard');
            }
          })
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

    <>
      <LoginHeader />
      <div style={{ marginTop: "150px" }}>
        <h3 className="card-title" style={{ marginLeft: "50%" }}>Login Form</h3>
        <div className="col-md-6 grid-margin stretch-card" style={{ marginLeft: "27%" }}>
          <div className="card">
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit(onSubmitLoginform)}>
                <div className="form-group row">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="col-sm-3 col-form-label"
                  >
                    Email <span className='error' style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>

                </div>
                <div className="form-group row">
                  <label
                    htmlFor="exampleInputPassword2"
                    className="col-sm-3 col-form-label"
                  >
                    Password <span className='error' style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>
                </div>
                <div className="text-center mt-12 font-weight-light"> Don't have an account? <a href="/register" className="text-primary">Register Here</a>
                </div>
                <br></br><br></br>
                <div className="col-sm-9" style={{ marginLeft: "28%" }}>
                  <button type="submit" className="btn btn-gradient-primary " style={{ marginLeft: "5%" }}>
                    Login
                  </button>
                  <Link to="/" className="btn btn-light" style={{ marginLeft: "5%" }}>Back</Link>
                </div>
              </form>
            </div>
          </div>
        </div></div>

    </>
  );
}

export default Login;