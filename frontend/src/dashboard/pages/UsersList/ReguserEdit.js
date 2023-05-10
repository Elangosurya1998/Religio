import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiUrl from '../Api/Api';


function ReguserEdit() {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('* Username is required'),
    email: Yup.string()
      .required('* Email is required')
      .email('* Email is invalid'),
    role: Yup.string()
      .required('* Role is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const [name, setName] = useState('');
  const handleChange = event => {
    const result = event.target.value.replace(/[^a-z ]/gi, '');
    setName(result);
  }
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    fetch(`${ApiUrl}/Religio/UsersList/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      reset(resp.data[0]);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

  function onSubmitEditform(data, e) {
    axios.put(`${ApiUrl}/Religio/Userupdate/${id}`, data)
      .then((Response) => {
        if (Response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully!',
            showConfirmButton: true,
          });
          e.target.reset();
          navigate('/Religio/UsersList');
        }
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
          </span> UserList Update
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample" onSubmit={handleSubmit(onSubmitEditform)} >
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group row">
                      <label className="col-sm-6 col-form-label">User Name <span style={{ color: "red" }}>*</span></label>
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
                      <label className="col-sm-6 col-form-label">Email Address <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input name="email" placeholder='Enter Email' type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoComplete='off' />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-6 col-form-label">Assigned Role <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select {...register('role')} className={`form-control ${errors.role ? 'is-invalid' : ''}`} name="role" >

                          <option value="select your role" disabled>User Type</option>

                          <option value="admin">Admin</option>

                          <option value="user">User</option>

                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button class="btn btn-gradient-primary font-weight-bold " type="submit">Update</button>
                  &nbsp; &nbsp; &nbsp;
                  <Link to="/Religio/UsersList" class="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReguserEdit;