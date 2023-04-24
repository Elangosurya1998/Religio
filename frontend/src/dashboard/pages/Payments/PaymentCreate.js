import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from "../../includes/Navbar";

function PaymentCreate() {
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

          function onSubmitformregister(data,e){
             console.log(data);
                axios.post(`${ApiUrl}/Religio/Clientregistration/store`,data)
                .then((response) => {
                  if (response.status === 200) {
                    Swal.fire(
                        'registrated Successfully..!',
                        'Client Added ..',
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
         const [ selectState, data ] = useState([]);
       
         function CongregationSelect(event ) {
          var id =event.target.value
          console.log(id);
         axios.get(`${ApiUrl}/Religio/Province/get/${id}`)
         .then((response) => {
          SetProvince(response.data.data)
          console.log(response.data.data);
        }).catch((err)=>{
          console.log(err);
        })
     }
    const [ Pro, SetProvince ] = useState([]);
    
    const changeHandler = (event) => {
       alert();
     setSelectedFile(event.target.files[0]);
		// setIsSelected(true);
    };
    const [selectedFile, setSelectedFile] = useState();
  return (  
    
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-account-multiple-plus menu-icon" />
            </span> Payment Status
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
                    <form className="form-sample" onSubmit={handleSubmit(onSubmitformregister)}>
                    <br></br>
                      <div className="form-group">
                        <label>Client Type &nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <select className="form-control" id="clienttype" name="clienttype" {...register("clienttype", { required: true })} aria-invalid={errors?.clienttype ? "true" : "false"}>
                          <option value="">Select Client</option>
                            <option value="New Sales">New Sales</option>
                            <option value="AMC">AMC</option>
                            <option value="Outstanding">Outstanding</option>
                          </select>
                          {errors?.clienttype?.type === 'required' &&  <div className='text-danger text_error'>Please Choose One congregation
                          </div>}
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <select className="form-control" name="congregation"
                            {...register("congregation", { required: true,onChange: CongregationSelect })} aria-invalid={errors?.congregation ? "true" : "false"}>
                              <option value="">Select Congregation</option>
                              {  congre && congre.map(item => (
                                <option value={item.id}>{item.CongregationName  }</option>)) 
                              }
                            </select>
                            {errors?.congregation?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Congregation</label></div>}
                        </div>

                        <div className="form-group col-md-6">
                          <label>Province &nbsp;<span style={{ color: 'red' }}>*</span>
                          </label>
                            <select className="form-control"  name="province"
                              {...register("province", { required: true })}
                              aria-invalid={errors?.province ? "true" : "false"}>
                              <option value="">Select Province</option>
                                {         
                                  Pro && Pro.map(item => (
                                  <option value={item.id}>{item.Province  }</option>))
                                }
                            </select>
                            {errors?.province?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please Choose One Province</label></div>}
                        </div>
                      </div>
                      
                        <div className="form-group">
                          <label>Product &nbsp;<span style={{ color: 'red' }}>*</span>
                          </label>
                            <select className="form-control" id="product" name="product" {...register("product", { required: true })} aria-invalid={errors?.product ? "true" : "false"}>
                            <option value="">Select Product</option>
                              <option value="RELIGIO">RELIGIO</option>
                              <option value="AVOSA">AVOSA</option>
                            </select>
                            {errors?.product?.type === 'required' &&  <div className='text-danger text_error'>Please Choose One Product
                            </div>}
                        </div>

                        <div className="form-group">
                            <label>Place&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="place" 
                            {...register("place", { required: true})}
                            aria-invalid={errors?.place ? "true" : "false"}  />
                            {errors?.place?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Place is required</label></div>}
                         </div>
                      
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Financial Year&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="Place" 
                            {...register("Place", { required: true,pattern:/^\d{4}-\d{4}$/})}
                            aria-invalid={errors?.Place ? "true" : "false"}  />
                            {errors?.Place?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Place is required</label></div>}
                            {errors?.Place?.type === 'pattern' && <div className='text-danger text_error'><label className="errlabel">Please enter following format YYYY-YYYY </label></div>}
                        </div>

                        <div className="form-group col-md-6">
                          <label>Client Code&nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <input type="text" className="form-control" name="clientcode" 
                            {...register("clientcode", { required: true,pattern:/^[0-9a-zA-Z]+$/ })}
                            aria-invalid={errors?.clientcode ? "true" : "false"}/>
                             {errors?.clientcode?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Client Code is required</label></div>}
                             {errors?.clientcode?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Client Code contain only Numbers & Alphabets</label></div>}
                            </div>
                      </div>

                        <div className="form-group">
                          <label>P/I &nbsp;<span style={{ color: 'red' }}>*</span>
                          </label>
                            <select className="form-control" id="pi" name="pi" {...register("pi", { required: true })} aria-invalid={errors?.pi ? "true" : "false"}>
                              <option value="">Select P/I</option>
                              <option value="Sales Team">Sales Team</option>
                              <option value="Religio Team">Religio Team</option>
                            </select>
                            {errors?.pi?.type === 'required' &&  <div className='text-danger text_error'>Please Choose One P/I
                            </div>}
                            </div>

                        <div className="form-group">
                          <label>Project Value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="projectvalue" 
                             {...register("projectvalue", { required: true ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.projectvalue ? "true" : "false"}  />
                             {errors?.projectvalue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Project Value is required</label></div>}
                             {errors?.projectvalue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Project Value can contain only Numbers</label></div>}
                        </div> 

                      
                        <div className="form-group">
                          <label>AMC value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control"  name="amcvalue"
                                {...register("amcvalue", { required: true , pattern: {value: /^[0-9\b]+$/, } })}
                                aria-invalid={errors?.amcvalue ? "true" : "false"}  />
                                {errors?.amcvalue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">AMC value is required</label></div>}
                                {errors?.amcvalue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">AMC value can contain only Numbers</label></div>}
                        </div>

                        <div className="form-group">
                          <label>GST</label>
                          <input type="text" className="form-control" id="gst" name="gst"/>
                        </div>

                        <div className="form-group">
                          <label>Total</label>
                          <input type="text" className="form-control" id="total" name="total"/>
                        </div>

                        <div className="form-group">
                          <label>Paid&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="paid" 
                             {...register("paid", { required: true ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.paid ? "true" : "false"}  />
                             {errors?.paid?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Paid Value is required</label></div>}
                             {errors?.paid?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Paid Value can contain only Numbers</label></div>}
                        </div>

                      <div className="form-group">
                          <label>Balance</label>
                          <input type="text" className="form-control" id="balance" name="balance"/>
                        </div>

                        <div className="form-group">
                          <label>Status</label>
                          <input type="text" className="form-control" id="status" name="status"/>
                        </div>

                      <div className="text-center">
                        <button className="btn btn-gradient-primary font-weight-bold " type="submit">Save</button>
                        &nbsp; &nbsp; &nbsp; 
                        <Link to="/Religio/ClientRegistration" className="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                      </div>  
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
         );
    }

  export default PaymentCreate;