import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';


function Register() {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('* Username is required'),
    email: Yup.string()
      .required('* Email is required')
      .email('* Email is invalid'),
    password: Yup.string()
      .min(6, '* Password must be at least 6 characters')
      .required('* Password is required'),
      confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '* Passwords must match')
      .required('* Confirm Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const [name, setName] = useState('');
  const handleChange = event => {
    const result = event.target.value.replace(/[^a-z ]/gi, '');
    setName(result);
  }
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmitRegisterform(data) {
    axios.post('http://127.0.0.1:8000/api/Register', data)
      .then((Response) =>{
        Swal.fire({
          text: 'Registered successfully',
          icon: 'success',
          confirmButtonColor: 'green'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        })
      }).catch((err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err.message
        })
      })
    
  }

  return (
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
               <a href='/'> <img src="./logo.png"/></a>
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
              <form class="pt-3" onSubmit={handleSubmit(onSubmitRegisterform)} >
                <div class="form-group">
                  <input name="username" placeholder='username' value={name} type="text" {...register('username',)} className={`form-control ${errors.username ? 'is-invalid' : ''}`} onChange={handleChange} />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div class="form-group">
                  <input name="email" placeholder='email' type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div class="form-group">
                  <input name="password" placeholder='password' type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div class="form-group">
                  <input name="confirmpassword" placeholder='confirmpassword' type="password" {...register('confirmpassword')} className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                </div>
                <div class="text-center mt-4 font-weight-light"> Already have an account? <a href="/login" class="text-primary" style={{textDecoration:"none"}}>Login</a>
                </div>
                <div class="text-center mt-4 font-weight-light"><a href="/" class="text-primary" style={{textDecoration:"none"}}>Home</a>
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
export default Register;