import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoginHeader from '../../landing/includes/LoginHeader';

function Register() {
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('* User name is required'),
    email: Yup.string()
      .required('* Email is required')
      .email('* Email is invalid'),
    password: Yup.string()
      .min(6, '* Password must be at least 6 characters')
      .required('* Password is required'),
    confirmPassword: Yup.string()
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
      .then(Response => console.log(Response))
    Swal.fire({
      text: 'Registered successfully',
      icon: 'success',
      confirmButtonColor: 'green'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    })
  }

  return (
    <>
      <LoginHeader />
      <div style={{ marginTop: "150px" }}>
        <h3 className="card-title" style={{ marginLeft: "50%" }}>Register Form</h3>
        <div className="col-md-6 grid-margin stretch-card" style={{ marginLeft: "27%" }}>
          <div className="card">
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit(onSubmitRegisterform)} >
                <div className="form-group row">
                  <label
                    htmlFor="exampleInputUsername2"
                    className="col-sm-3 col-form-label"
                  >
                    Username <span className='error' style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input name="userName" value={name} type="text" {...register('userName',)} className={`form-control ${errors.userName ? 'is-invalid' : ''}`} onChange={handleChange} />
                    <div className="invalid-feedback">{errors.userName?.message}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="col-sm-3 col-form-label"
                  >
                    Email <span className='error' style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
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
                <div className="form-group row">
                  <label
                    htmlFor="exampleInputCPassword2"
                    className="col-sm-3 col-form-label"
                  >
                    Confirm Password <span className='error' style={{ color: "red" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </div>
                </div>
                <div className="text-center mt-12 font-weight-light"> Already have an account? <a href="/login " className="text-primary">Login Here</a>
                </div>
                <br></br><br></br>
                <div className="col-sm-9" style={{ marginLeft: "28%" }}>
                  <button type="submit" className="btn btn-gradient-primary " style={{ marginLeft: "5%" }} >
                    Register
                  </button>
                  <Link to="/login" className="btn btn-light" style={{ marginLeft: "5%" }}>Back</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;

