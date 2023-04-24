 
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
              {/* <div className="row"><b className="card-description"> Province </b></div> */}
              <form className="form-sample" onSubmit={handleSubmit(onSubmitCongregationform)} > 
                <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Congregation</label>
                            <div className="col-sm-8">
                            <select className="form-control" name="congregation"
                             {...register("congregation", { required: true })}
                             aria-invalid={errors?.congregation ? "true" : "false"}>
                            <option value="">Select Congregation</option>
                            {         
                           congre && congre.map(item => (
                          <option value={item.id}>{item.congregation }</option>))
                             }
                              </select>
                              {errors?.Congregation?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Congregation</label></div>}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Province</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="province"
                            {...register("province", { required: true})}
                            aria-invalid={errors?.province ? "true" : "false"}  />
                            {errors?.province?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Province Name is required</label></div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="row"><b className="card-description"> Address </b></div>
                     <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Address 1</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="address1"
                            {...register("address1", { required: true })}
                            aria-invalid={errors?.address1 ? "true" : "false"}  />
                            {errors?.address1?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Address 1 is required</label></div>}
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Postcode</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="postcode"
                            {...register("postcode", { required: true })}
                            aria-invalid={errors?.postcode ? "true" : "false"}  />
                            {errors?.postcode?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Postcode is required</label></div>}
                        </div>
                        </div>
                      </div>
                    </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Address 2</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="address2"
                        {...register("address2")}/>
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
                          {errors?.country?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Country</label></div>}
                        </div>
                      </div>
                    </div>
                 </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">City</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" name="city"
                        {...register("city", { required: true })}
                        aria-invalid={errors?.city ? "true" : "false"}  />
                        {errors?.city?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">City is required</label></div>}
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
                            {errors?.state?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One State</label></div>}
                         </div>
                    </div>
                  </div>
                </div>
                <div className="row"> 
                <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="email"
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                            aria-invalid={errors?.email ? "true" : "false"}  />
                            {errors?.email?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Email is required</label></div>}
                            {errors?.email?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Invalid email address</label></div>}
                        </div>
                        </div>
                      </div>
                    <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Mobile No</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" name="mobile"
                            {...register("mobile", { required: true, minLength: 10, maxLength: 12, pattern: /^[]?\d*(?:[.,]\d*)?$/ })}
                            aria-invalid={errors?.mobile ? "true" : "false"}  />
                            {errors?.mobile?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Mobile Number is required</label></div>}
                            {errors?.mobile?.type === "minLength" && <div className='text-danger text_error '><label className="errlabel">Mobile Number shoul be minimum Numbers 10</label></div>}
                            {errors?.mobile?.type === "maxLength" && <div className='text-danger text_error '><label className="errlabel">Mobile Number shoul be  maximum Numbers12</label></div>}
                            {errors?.mobile?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Mobile Number can contain only Numbers</label></div>}
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
  