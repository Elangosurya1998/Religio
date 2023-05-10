import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiUrl from '../Api/Api';
import $ from "jquery";



$(function () {
    $("#toggle_rcpwd").click(function () {
      $("#toggle-rceye").toggleClass("fa-eye-slash");
      var type = $("#toggle-rceye").hasClass("fa-eye-slash") ? "text" : "password";
      $("#rcpassword").attr("type", type);
    });
  });

  $(function () {
    $("#toggle_crpwd").click(function () {
      $("#toggle-creye").toggleClass("fa-eye-slash");
      var type = $("#toggle-creye").hasClass("fa-eye-slash") ? "text" : "password";
      $("#crpassword").attr("type", type);
    });
  });
  
function ReguserCreate() {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('* Username is required'),
        email: Yup.string()
            .required('* Email is required')
            .email('* Email is invalid'),
        role: Yup.string()
            .required('* Role is required'),
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
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const navigate = useNavigate();

    function onSubmitform(data) {
        axios.post(`${ApiUrl}/Register`, data)
            .then((Response) => {
                Swal.fire({
                    title: 'Registered successfully',
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
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                        <i className="mdi mdi-account-plus menu-icon" />
                    </span> Add New Users
                </h3>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-sample" onSubmit={handleSubmit(onSubmitform)} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group row">
                                            <label className="col-form-label">User Name <span style={{ color: "red" }}>*</span></label>
                                            <div className="col-sm-12">
                                                <input name="username" placeholder='Enter Username' value={name} type="text" {...register('username',)} className={`form-control ${errors.username ? 'is-invalid' : ''}`} onChange={handleChange} autoComplete='off' />
                                                <div className="invalid-feedback">{errors.username?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-6 col-form-label">Email <span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-9'>
                                                <input name="email" placeholder='Enter Email' type="text" {...register('email',)} className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoComplete='off' />
                                                <div className="invalid-feedback">{errors.email?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-6 col-form-label">Password <span style={{ color: "red" }}>*</span></label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                <input name="password" placeholder='Enter Password' type="password" id='rcpassword' {...register('password',)} className={`form-control ${errors.password ? 'is-invalid' : ''}`} autoComplete='off' />
                                                    <div className="input-group-append">
                                                        <span id="toggle_rcpwd" className="input-group-text" style={{ cursor: "pointer" }}><i id="toggle-rceye" className="fa fa-eye field_icon"></i></span>
                                                    </div>
                                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-6 col-form-label">Confirm Password <span style={{ color: "red" }}>*</span></label>
                                            <div className="col-sm-9">
                                            <div className="input-group">
                                            <input name="confirmpassword" placeholder='Enter Confirm Password' id='crpassword' type="password" {...register('confirmpassword',)} className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`} autoComplete='off' />
                                                    <div className="input-group-append">
                                                        <span id="toggle_crpwd" className="input-group-text" style={{ cursor: "pointer" }}><i id="toggle-creye" className="fa fa-eye field_icon"></i></span>
                                                    </div>
                                                    <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-6 col-form-label">Role <span style={{ color: "red" }}>*</span></label>
                                            <div className="col-sm-9">
                                                <select className={`form-control ${errors.role ? 'is-invalid' : ''}`} id="role" name="role" {...register("role", { required: true })} >

                                                    <option value="">User Type</option>

                                                    <option value="admin">Admin</option>

                                                    <option value="user">User</option>

                                                </select>
                                                <div className="invalid-feedback">{errors.role?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-gradient-primary font-weight-bold " type="submit">Submit</button>
                                    &nbsp; &nbsp; &nbsp;
                                    <Link to="/Religio/UsersList" className="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReguserCreate;