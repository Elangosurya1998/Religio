import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function ClientRegistrationEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });  

      const country = require('country-state-city').Country
      const value = country.getAllCountries()
      const {id} = useParams();
    
      useEffect(() => {
        fetch(`${ApiUrl}/Religio/Registeredit/${id}`).then((res) => {
            return res.json();
        }).then((resp) => {
          reset(resp.data[0]);
          const value =resp.data[0].country
           const State = require('country-state-city').State
           var getValue = State.getStatesOfCountry(value) 
           data(getValue);
           }).catch((err) => {
            console.log(err.message);
        })
      }, [])
   
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

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Province`).then((res) => {
        return res.json();
    }).then((resp) => {
      SetProvince(resp.data);
    }).catch((err) => {
        console.log(err.message);
    })
  }, []) 
    const [ Pro, SetProvince ] = useState([]);
    
    const navigate = useNavigate();

  function onSubmitformregister(data,e){
   console.log(data);
    axios.put(`${ApiUrl}/Religio/Clientregistrationupdate/${id}`,data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
              'Updated Successfully..!',
              'Client Data Updated ..',
              'success'
            );
            navigate('/Religio/ClientRegistration');
            e.target.reset();  
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
 function CongregationSelect(event ) {
  var id =event.target.value
 axios.get(`${ApiUrl}/Religio/Province/get/${id}`)
 .then((response) => {
  SetProvince(response.data.data)
  console.log(response.data.data);
}).catch((err)=>{
  console.log(err);
})
}
  return (    
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-account-multiple-plus menu-icon" />
            </span> Update Client Details
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
                    <h4 className="card-title"> Client Registration</h4>
                    <form className="form-sample" onSubmit={handleSubmit(onSubmitformregister)}>
                     <br></br>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="Congregation">Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <select className="form-control" name="Congregation"
                            {...register("Congregation", { required: true,onChange: CongregationSelect })}
                            aria-invalid={errors?.Congregation ? "true" : "false"}>
                            <option value="">Select Congregation</option>
                            {  congre && congre.map(item => (
                          <option value={item.id}>{item.CongregationName  }</option>)) }
                              </select>
                              {errors?.Congregation?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Congregation</label></div>}
                          </div>

                        <div className="form-group col-md-6">
                          <label for="province">Province &nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <select className="form-control"  name="Province"
                            {...register("Province", { required: true })}
                            aria-invalid={errors?.Province ? "true" : "false"}>
                                <option value="">Select Province</option>
                                {         
                          Pro && Pro.map(item => (
                          <option value={item.id}>{item.Province  }</option>))
                            }
                              </select>
                              {errors?.Province?.type === 'required' && <div className='text-danger text_error'>Please Choose One Province</div>}

                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Name&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="Name"
                            {...register("Name", { required: true })}
                             aria-invalid={errors?.Name ? "true" : "false"}  />
                             {errors?.Name?.type === 'required' && <div className='text-danger text_error'>Name is required</div>}
                         </div>
                        <div className="form-group col-md-6">
                            <label>Place&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="Place" 
                            {...register("Place", { required: true})}
                            aria-invalid={errors?.Place ? "true" : "false"}  />
                            {errors?.Place?.type === 'required' && <div className='text-danger text_error'>Place is required</div>}
                         </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                             <label>Client Type&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <select className="form-control" name="ClientType"
                            {...register("ClientType", { required: true })}
                            aria-invalid={errors?.ClientType ? "true" : "false"}>
                                <option value="">Select Client Type</option>
                                <option value="Priest">Priest</option>
                                <option value="Sisters">Sisters</option>
                                <option value="LayBrothers">Lay Brothers</option>
                              </select>
                              {errors?.ClientType?.type === 'required' && <div className='text-danger text_error'>Please Choose One ClientType</div>}
                         </div>
                        <div className="form-group col-md-6">
                          <label>Financial Year&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="date" className="form-control" placeholder="YYYY" name="FinancialYear"
                             {...register("FinancialYear", { required: true })}
                             aria-invalid={errors?.FinancialYear ? "true" : "false"}  />
                             {errors?.FinancialYear?.type === 'required' && <div className='text-danger text_error'>Financial Year is required</div>}
                            </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                           <label>Client Code&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="text" className="form-control" name="ClientCode" 
                            {...register("ClientCode", { required: true })}
                            aria-invalid={errors?.ClientCode ? "true" : "false"}/>
                             {errors?.ClientCode?.type === 'required' && <div className='text-danger text_error'>Client Code is required</div>}
                       </div>
                        <div className="form-group col-md-6">
                          <label>Date of Joining&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="Date" className="form-control" name="DateofJoining" 
                              {...register("DateofJoining", { required: true })}
                              aria-invalid={errors?.DateofJoining ? "true" : "false"}  />
                              {errors?.DateofJoining?.type === 'required' && <div className='text-danger text_error'>Date of Joining is required</div>}
                        </div> 
                      </div>
                      <div className="form-row">
                      <div className="form-group col-md-6">
                            <label>Contract Signed Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="Date" className="form-control" name="DateofContractSigning" 
                            {...register("DateofContractSigning", { required: true })}
                            aria-invalid={errors?.DateofContractSigning ? "true" : "false"}  />
                            {errors?.DateofContractSigning?.type === 'required' && <div className='text-danger text_error'>Date of Contract Signing is required</div>}
                       </div>
                         <div className="form-group col-md-6">
                           <label >AMC Start Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="Date" className="form-control" name="AMCDate"
                            {...register("AMCDate", { required: true })}
                            aria-invalid={errors?.AMCDate ? "true" : "false"}  />
                            {errors?.AMCDate?.type === 'required' && <div className='text-danger text_error'>AMC Date is required</div>}
                        </div>
                      </div>
                      <div className="form-row">
                      <div className="form-group col-md-6">
                           <label>Project Value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="text" className="form-control" name="ProjectValue" 
                             {...register("ProjectValue", { required: true ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.ProjectValue ? "true" : "false"}  />
                             {errors?.ProjectValue?.type === 'required' && <div className='text-danger text_error'>Project Value is required</div>}
                             {errors?.ProjectValue?.type === "pattern" && <div className='text-danger text_error '>Project Value can contain only Numbers</div>}
                          </div>
                         <div className=" form-group col-md-6">
                          <label>AMC value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="text" className="form-control"  name="AMCvalue"
                                {...register("AMCvalue", { required: true , pattern: {value: /^[0-9\b]+$/, } })}
                                aria-invalid={errors?.AMCvalue ? "true" : "false"}  />
                                {errors?.AMCvalue?.type === 'required' && <div className='text-danger text_error'>AMC value is required</div>}
                                {errors?.AMCvalue?.type === "pattern" && <div className='text-danger text_error '>AMC value can contain only Numbers</div>}
                         </div>
                      </div>
                      <div className="form-row">
                      <div className="form-group col-md-6">
                            <label>Project Status&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <select className="form-control" name="ProjectStatus"
                            {...register("ProjectStatus", { required: true })}
                            aria-invalid={errors?.ProjectStatus ? "true" : "false"}>
                                <option value="" selected disabled>Select Project Status</option>
                                <option value="Completed">Completed</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Notstrated">Not Started</option>
                              </select>
                              {errors?.ProjectStatus?.type === 'required' && <div className='text-danger text_error'>Please Choose One ClientType</div>}
                            </div>
                        {/* <div className=" form-group col-md-6">
                            <label>File Attachment&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="File" className="form-control" name="FileAttachment"
                              {...register("FileAttachment", { required: true})}
                              aria-invalid={errors?.FileAttachment ? "true" : "false"}/>
                               {errors?.FileAttachment?.type === 'required' && <div className='text-danger text_error'>Choose a File</div>}
                            </div> */}
                      </div>   
                      <div className="row"><b className="card-description"> Address </b></div>
                      <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Mobile No&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="text" className="form-control" name="Mobile"
                            {...register("Mobile", { required: true, minLength: 10, maxLength: 12, pattern: /^[]?\d*(?:[.,]\d*)?$/ })}
                            aria-invalid={errors?.Mobile ? "true" : "false"}  />
                            {errors?.Mobile?.type === 'required' && <div className='text-danger text_error'>Mobile Number is required</div>}
                            {errors?.Mobile?.type === "minLength" && <div className='text-danger text_error '>Mobile Number shoul be minimum Numbers 10</div>}
                            {errors?.Mobile?.type === "maxLength" && <div className='text-danger text_error '>Mobile Number shoul be  maximum Numbers12</div>}
                            {errors?.Mobile?.type === "pattern" && <div className='text-danger text_error '>Mobile Number can contain only Numbers</div>}
                           </div>
                      <div className="form-group col-md-6">
                         <label>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="text" className="form-control" name="Email"
                            {...register("Email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                            aria-invalid={errors?.Email ? "true" : "false"}  />
                            {errors?.Email?.type === 'required' && <div className='text-danger text_error'>Email is required</div>}
                            {errors?.Email?.type === "pattern" && <div className='text-danger text_error '>Invalid email address</div>}
                       </div>
                    </div> 
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Address 1&nbsp;<span style={{ color: 'red' }}>*</span></label>
                              <input type="text" className="form-control" name="Address1"
                              {...register("Address1", { required: true })}
                              aria-invalid={errors?.Address1 ? "true" : "false"}  />
                              {errors?.Address1?.type === 'required' && <div className='text-danger text_error'>Address 1 is required</div>}
                        </div>
                        <div className="form-group col-md-6">
                          <label>Postcode&nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <input type="text" className="form-control" name="Postcode"
                              {...register("Postcode", { required: true, pattern: {value: /^[0-9\b]+$/, } })}
                              aria-invalid={errors?.Postcode ? "true" : "false"}  />
                              {errors?.Postcode?.type === 'required' && <div className='text-danger text_error'>Postcode is required</div>}
                              {errors?.Postcode?.type === "pattern" && <div className='text-danger text_error '>Postcode can contain only Numbers</div>}
                          </div>
                       </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                           <label >Address 2</label>
                               <input type="text" className="form-control" name="Address2"
                                {...register("Address2")}
                                />
                               </div>
                          <div className="form-group col-md-6">
                              <label>Country&nbsp;<span style={{ color: 'red' }}>*</span></label>
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
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>City&nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" name="City"
                    {...register("City", { required: true })}
                    aria-invalid={errors?.City ? "true" : "false"}  />
                    {errors?.City?.type === 'required' && <div className='text-danger text_error'>City is required</div>}
                  </div>
                 <div className="form-group col-md-6">
                    <label>State&nbsp;<span style={{ color: 'red' }}>*</span></label>
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
                      <div className="text-center">
                      <button class="btn btn-gradient-primary font-weight-bold " type="submit">Update</button>
                      &nbsp; &nbsp; &nbsp; 
                      <Link to="/Religio/ClientRegistration" class="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                </div>  
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
         );
    }

  export default ClientRegistrationEdit;