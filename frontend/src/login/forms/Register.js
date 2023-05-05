import React, { useState } from 'react';
  import { useForm } from "react-hook-form";
  import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from "jquery";



$(function () {
  $("#toggle_rpwd").click(function () {
    $("#toggle-reye").toggleClass("fa-eye-slash");
    var type = $("#toggle-reye").hasClass("fa-eye-slash") ? "text" : "password";
    $("#rpassword").attr("type", type);
  });
});

$(function () {
  $("#toggle_cpwd").click(function () {
    $("#toggle-ceye").toggleClass("fa-eye-slash");
    var type = $("#toggle-ceye").hasClass("fa-eye-slash") ? "text" : "password";
    $("#cpassword").attr("type", type);
  });
});
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

  function onSubmitform(data) {
    axios.post('http://127.0.0.1:8000/api/Register', data)
      .then((Response) => {
        Swal.fire({
          text: 'Registered successfully',
          icon: 'success',
          confirmButtonColor: 'green'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/Religio/UsersList');
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
                <form class="pt-3" onSubmit={handleSubmit(onSubmitform)} >
                  <div class="form-group">
                    <input name="username" placeholder='Enter Username' value={name} type="text" {...register('username',)} className={`form-control ${errors.username ? 'is-invalid' : ''}`} onChange={handleChange} autoComplete='off' />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                  </div>
                  <div className="form-group">
                    <input name="email" placeholder='Enter Email' type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoComplete='off' />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input name="password" placeholder='Enter Password' id='rpassword' type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} autoComplete='off' />
                      <div className="input-group-append">
                        <span id="toggle_rpwd" className="input-group-text" style={{ cursor: "pointer" }}><i id="toggle-reye" className="fa fa-eye field_icon"></i></span>
                      </div>
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input name="confirmpassword" placeholder='Enter Confirm Password' type="password" id='cpassword' {...register('confirmpassword')} className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`} autoComplete='off' />
                      <div className="input-group-append">
                        <span id="toggle_cpwd" className="input-group-text" style={{ cursor: "pointer" }}><i id="toggle-ceye" className="fa fa-eye field_icon"></i></span>
                      </div>
                      <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <select className="form-control" name="role">
                      <option value="select your role" selected disabled>User Type</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                  </div>
                  {/* <div className="text-center mt-4 font-weight-light"> Already have an account? <a href="/login" className="text-primary" style={{textDecoration:"none"}}> Login Here</a>
                </div> */}
                  <div className="text-center mt-4 font-weight-light"><a href="/Religio/Dashboard" className="text-primary" style={{ textDecoration: "none" }}><i className="fa fa-home"> Home</i></a>
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