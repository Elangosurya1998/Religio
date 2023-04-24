import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from 'jquery'

function ClientRegistrationEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });  

      const country = require('country-state-city').Country
      const value = country.getAllCountries()
      const {id} = useParams();
    
      useEffect(() => {
        fetch(`${ApiUrl}/Religio/Registeredit/${id}`).then((res) => {
            return res.json();
        }).then((resp) => {
          console.log(resp);
          reset(resp.data[0]);
          const value =resp.data[0].country
           const State = require('country-state-city').State
           var getValue = State.getStatesOfCountry(value) 
           data(getValue);
          const fileDatas = resp.data[0].fileAttachment
           fileData(fileDatas);
           }).catch((err) => {
            console.log(err.message);
        })
      }, [])
   
      const [ file ,fileData] = useState();
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
   const formData = new FormData();
   formData.append('File', selectedFile);
   console.log(formData);    

    axios.put(`${ApiUrl}/Religio/Clientregistrationupdate/${id}`,data)
      .then((response) =>{
        axios.post(`${ApiUrl}/Religio/Clientregistration/uploadfile/${id}`,formData)
        .then((response) => {
          console.log(response);
        }).catch((err)=>{
         console.log(err);
        })
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
      }).catch((err)=>{
        console.log(err);
      })
      }
      const changeHandler = (event) => {     
        setSelectedFile(event.target.files[0]);
        $(".filelabel").hide();
      };
      const [selectedFile, setSelectedFile] = useState();
      console.log(selectedFile);
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
                    {/* <h4 className="card-title"> Client Registration</h4> */}
                    <form className="form-sample" onSubmit={handleSubmit(onSubmitformregister)}>
                      <br></br>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="Congregation">Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <select className="form-control" name="congregation"
                            {...register("congregation", { required: true,onChange: CongregationSelect })}
                            aria-invalid={errors?.congregation ? "true" : "false"}>
                            <option value="">Select Congregation</option>
                            {  congre && congre.map(item => (
                          <option value={item.id}>{item.congregation  }</option>)) }
                              </select>
                              {errors?.congregation?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Congregation</label></div>}
                          </div>

                        <div className="form-group col-md-6">
                          <label for="province">Province &nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <select className="form-control"  name="province"
                            {...register("province", { required: true })}
                            aria-invalid={errors?.province ? "true" : "false"}>
                                <option value="">Select Province</option>
                                {         
                          Pro && Pro.map(item => (
                          <option value={item.id}>{item.province  }</option>))
                            }
                              </select>
                              {errors?.province?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Province</label></div>}

                        </div>
                      </div>
                      <div className="form-group">
                         <label>Name&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="name"
                            {...register("name", { required: true })}
                             aria-invalid={errors?.name ? "true" : "false"}  />
                             {errors?.name?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Name is required</label></div>}
                          </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                             <label>Client Type&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <select className="form-control" name="clientType"
                            {...register("clientType", { required: true })}
                            aria-invalid={errors?.clientType ? "true" : "false"}>
                                <option value="">Select Client Type</option>
                                <option value="Priest">Priest</option>
                                <option value="Sisters">Sisters</option>
                                <option value="LayBrothers">Lay Brothers</option>
                              </select>
                              {errors?.clientType?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One ClientType</label></div>}
                         </div>
                               <div className="form-group col-md-6">
                            <label>Place&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="place" 
                            {...register("place", { required: true})}
                            aria-invalid={errors?.place ? "true" : "false"}  />
                            {errors?.place?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Place is required</label></div>}
                         </div>
                      </div>
                     <div className="form-group">
                           <label>Client Code&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="text" className="form-control" name="clientcode" 
                            {...register("clientcode", { required: true,pattern: /^[0-9a-zA-Z]+$/ })}
                            aria-invalid={errors?.clientcode ? "true" : "false"}/>
                             {errors?.clientcode?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Client Code is required</label></div>}
                             {errors?.clientcode?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Client Code contain only Numbers & Alphabets</label></div>}
                       </div> 
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Financial Year&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="date" className="form-control" placeholder="YYYY" name="financialyear"
                             {...register("financialyear", { required: true })}
                             aria-invalid={errors?.financialyear ? "true" : "false"}  />
                             {errors?.financialyear?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Financial Year is required</label></div>}
                            </div>
                        <div className="form-group col-md-6">
                          <label>Date of Joining&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="Date" className="form-control" name="dateofjoining" 
                              {...register("dateofjoining", { required: true })}
                              aria-invalid={errors?.dateofjoining ? "true" : "false"}  />
                              {errors?.dateofjoining?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Date of Joining is required</label></div>}
                        </div> 
                      </div>
                      <div className="form-group">
                           <label>Project Value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="text" className="form-control" name="projectValue" 
                             {...register("projectValue", { required: true ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.projectValue ? "true" : "false"}  />
                             {errors?.projectValue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Project Value is required</label></div>}
                             {errors?.projectValue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Project Value can contain only Numbers</label></div>}
                          </div>
                      <div className="form-row">
                      <div className="form-group col-md-6">
                            <label>Contract Signed Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="Date" className="form-control" name="dateofcontractsigning" 
                            {...register("dateofcontractsigning", { required: true })}
                            aria-invalid={errors?.dateofcontractsigning ? "true" : "false"}  />
                            {errors?.dateofcontractsigning?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Date of Contract Signing is required</label></div>}
                       </div>
                         <div className="form-group col-md-6">
                           <label >AMC Start Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="Date" className="form-control" name="amcDate"
                            {...register("amcDate", { required: true })}
                            aria-invalid={errors?.amcDate ? "true" : "false"}  />
                            {errors?.amcDate?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">AMC Date is required</label></div>}
                        </div>
                      </div>
                      
                         <div className=" form-group">
                          <label>AMC value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="text" className="form-control"  name="amcvalue"
                                {...register("amcvalue", { required: true , pattern: {value: /^[0-9\b]+$/, } })}
                                aria-invalid={errors?.amcvalue ? "true" : "false"}  />
                                {errors?.amcvalue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">AMC value is required</label></div>}
                                {errors?.amcvalue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">AMC value can contain only Numbers</label></div>}
                         </div>
                     
                      <div className="form-row">
                      <div className="form-group col-md-6">
                            <label>Project Status&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <select className="form-control" name="projectStatus"
                            {...register("projectStatus", { required: true })}
                            aria-invalid={errors?.projectStatus ? "true" : "false"}>
                                <option value="" >Select Project Status</option>
                                <option value="Completed">Completed</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Notstrated">Not Started</option>
                              </select>
                              {errors?.projectStatus?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One ClientType</label></div>}
                            </div>
                        <div className=" form-group col-md-6">
                            <label>File Attachment&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="File" className="form-control" name="fileAttachment" 
                              {...register("fileAttachment", {onChange:changeHandler})}/>
                              <div className="Getfile filelabel"><label className="errlabel" >{file}</label></div>
                            </div>
                      </div>   
                      <div className="row"><b className="card-description"> Address </b></div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Address 1&nbsp;<span style={{ color: 'red' }}>*</span></label>
                              <input type="text" className="form-control" name="address1"
                              {...register("address1", { required: true })}
                              aria-invalid={errors?.address1 ? "true" : "false"}  />
                              {errors?.address1?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Address 1 is required</label></div>}
                        </div>
                        <div className="form-group col-md-6">
                          <label>Postcode&nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <input type="text" className="form-control" name="postcode"
                              {...register("postcode", { required: true, pattern: {value: /^[0-9\b]+$/, } })}
                              aria-invalid={errors?.postcode ? "true" : "false"}  />
                              {errors?.postcode?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Postcode is required</label></div>}
                              {errors?.postcode?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Postcode can contain only Numbers</label></div>}
                          </div>
                       </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                           <label >Address 2</label>
                               <input type="text" className="form-control" name="address2"
                                {...register("address2")}
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
                                  {errors?.country?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Country</label></div>}
                             </div>
                        </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>City&nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" name="city"
                    {...register("city", { required: true })}
                    aria-invalid={errors?.city ? "true" : "false"}  />
                    {errors?.city?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">City is required</label></div>}
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
                    {errors?.state?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One State</label></div>}
                 </div>
                   </div>
                   <div className="form-row">
                   <div className="form-group col-md-6">
                         <label>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="text" className="form-control" name="email"
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                            aria-invalid={errors?.email ? "true" : "false"}  />
                            {errors?.email?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Email is required</label></div>}
                            {errors?.email?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Invalid email address</label></div>}
                       </div>
                         <div className="form-group col-md-6">
                        <label>Mobile No&nbsp;<span style={{ color: 'red' }}>*</span></label>
                           <input type="text" className="form-control" name="mobile"
                            {...register("mobile", { required: true, minLength: 10, maxLength: 12, pattern: /^[]?\d*(?:[.,]\d*)?$/ })}
                            aria-invalid={errors?.mobile ? "true" : "false"}  />
                            {errors?.mobile?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Mobile Number is required</label></div>}
                            {errors?.mobile?.type === "minLength" && <div className='text-danger text_error '><label className="errlabel">Mobile Number shoul be minimum Numbers 10</label></div>}
                            {errors?.mobile?.type === "maxLength" && <div className='text-danger text_error '><label className="errlabel">Mobile Number shoul be  maximum Numbers12</label></div>}
                            {errors?.mobile?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Mobile Number can contain only Numbers</label></div>}
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