 
import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
 
 function ProvinceCreate() {
   
    const country = require('country-state-city').Country
    const value = country.getAllCountries()
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' }); 
    const navigate = useNavigate();
    useEffect(() => {
      fetch(`${ApiUrl}/Religio/Province/Congregation`).then((res) => {
          return res.json();
      }).then((resp) => {
        Congregation(resp.data);
      }).catch((err) => {
          console.log(err.message);
      })
    }, [])
    const [ congre, Congregation ] = useState([]);

  function onSubmitCongregationform(data ,e){
    
    axios.post(`${ApiUrl}/Religio/Province/store`,data)
    .then((Response)=>{
      if (Response.status === 200) {
        Swal.fire(
          'Province Created Successfully..!',
          'Province Added ..',
          'success'
        );
        e.target.reset();
    navigate('/Religio/Province');
    }     
  }).catch((err)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: err.message
    })
  })  
  
  }
  
  function countrySelect(event ) {
    var value =event.target.value
    const State = require('country-state-city').State
    var getValue = State.getStatesOfCountry(value) 
    data(getValue);
  }
 const [ selectState, data ] = useState([]);
      return (
 <div className="content-wrapper">
        <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span> Province
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
            </li>
          </ul>
        </nav>
      </div>
        <div className="row"> 
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row"><b className="card-description"> Province </b></div>
              <form className="form-sample" onSubmit={handleSubmit(onSubmitCongregationform)} > 
                <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Congregation</label>
                            <div className="col-sm-8">
                            <select className="form-control" name="Congregation"
                             {...register("Congregation", { required: true })}
                             aria-invalid={errors?.Congregation ? "true" : "false"}>
                            <option value="">Select Congregation</option>
                            {         
                           congre && congre.map(item => (
                          <option value={item.id}>{item.CongregationName }</option>))
                             }
                              </select>
                              {errors?.Congregation?.type === 'required' && <div className='text-danger text_error'>Please Choose One Congregation</div>}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Province</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="Province"
                            {...register("Province", { required: true})}
                            aria-invalid={errors?.Province ? "true" : "false"}  />
                            {errors?.Province?.type === 'required' && <div className='text-danger text_error'>Province Name is required</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="row"><b className="card-description"> Address </b></div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Mobile No</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="Mobile"
                            {...register("Mobile", { required: true, minLength: 10, maxLength: 12, pattern: /^[]?\d*(?:[.,]\d*)?$/ })}
                            aria-invalid={errors?.Mobile ? "true" : "false"}  />
                            {errors?.Mobile?.type === 'required' && <div className='text-danger text_error'>Mobile Number is required</div>}
                            {errors?.Mobile?.type === "minLength" && <div className='text-danger text_error '>Mobile Number shoul be minimum Numbers 10</div>}
                            {errors?.Mobile?.type === "maxLength" && <div className='text-danger text_error '>Mobile Number shoul be  maximum Numbers12</div>}
                            {errors?.Mobile?.type === "pattern" && <div className='text-danger text_error '>Mobile Number can contain only Numbers</div>}
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="Email"
                            {...register("Email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                            aria-invalid={errors?.Email ? "true" : "false"}  />
                            {errors?.Email?.type === 'required' && <div className='text-danger text_error'>Email is required</div>}
                            {errors?.Email?.type === "pattern" && <div className='text-danger text_error '>Invalid email address</div>}
                        </div>
                        </div>
                      </div>
                    </div>   
                     <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Address 1</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="Address1"
                            {...register("Address1", { required: true })}
                            aria-invalid={errors?.Address1 ? "true" : "false"}  />
                            {errors?.Address1?.type === 'required' && <div className='text-danger text_error'>Address 1 is required</div>}
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Postcode</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="Postcode"
                            {...register("Postcode", { required: true })}
                            aria-invalid={errors?.Postcode ? "true" : "false"}  />
                            {errors?.Postcode?.type === 'required' && <div className='text-danger text_error'>Postcode is required</div>}
                        </div>
                        </div>
                      </div>
                    </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Address 2</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="Address2"
                        {...register("Address2")}/>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Country</label>
                        <div className="col-sm-9">
                        <select className="form-control Countryvalue" name="country" 
                          {...register("country", { required: true,onChange: countrySelect })}
                          aria-invalid={errors?.country ? "true" : "false"}>
                            <option value="">Select Country</option>
                                {         
                            value && value.map(item => (
                            <option  key={item.isoCode} value={item.isoCode}>{item.name }</option>))
                              }
                          </select> 
                          {errors?.country?.type === 'required' && <div className='text-danger text_error'>Please Choose One Country</div>}
                        </div>
                      </div>
                    </div>
                 </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">City</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="City"
                        {...register("City", { required: true })}
                        aria-invalid={errors?.City ? "true" : "false"}  />
                        {errors?.City?.type === 'required' && <div className='text-danger text_error'>City is required</div>}
                        </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">State</label>
                      <div className="col-sm-9">
                        <select className="form-control Countryindia" name="state"
                             {...register("state", { required: true })}
                             aria-invalid={errors?.state ? "true" : "false"}>
                            <option value="">Select State</option>
                            {         
                           selectState && selectState.map(item => (
                          <option  key={item.isoCode} value={item.isoCode}>{item.name }</option>))
                             }
                            </select>
                            {errors?.state?.type === 'required' && <div className='text-danger text_error'>Please Choose One State</div>}

                       </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                <button class="btn btn-gradient-primary font-weight-bold " type="submit">Submit</button>
                &nbsp; &nbsp; &nbsp; 
                <Link to="/Religio/Province" class="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
</div> 
              </form>
            </div>
          </div>
        </div>
        </div>
        </div>
      );
    }
    export default ProvinceCreate;
  