import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


function PaymentCreate() {

  const styles = {
    color: '#000000'
  };
  
      const { register, handleSubmit,reset, formState: { errors } } = useForm({ mode: 'onChange' });  
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
              
                data['balance'] = balanceAmount;
                data['gst'] = GSTAmount;
                //data['status'] = paymentStatus;
                data['total'] = totalAmount;
                data['balancepaid'] = balpaid;

                axios.post(`${ApiUrl}/Religio/Paymentstatus/store`,data)
                .then((response) => {
                  if (response.status === 200) {
                    Swal.fire(
                        'Created Successfully..!',
                        'Payment Status Added ..',
                        'success'
                      );
                      navigate('/Religio/PaymentStatus');
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

  // Hide/Show Fields Based on Client Type
  const [selectedValue, setSelectedValue] = useState('');
  const handleDropdownChange = (event) => {
  setSelectedValue(event.target.value);
  };

  // Auto Calculate Balance
  //const [provalue, setProvalue] = useState("");
  const [paidvalue, setPaidvalue] = useState("");
  const [amcvalue, setAmcvalue] = useState("");
  const [orgvalue, setOrgvalue] = useState("");

  const [paidbalvalue, setPaidbalvalue] = useState("");

  const projectvalueChange = (event,e) => {
    //setProvalue(event.target.value);
    setOrgvalue(event.target.value);
    
  };
  
  const paidvalueChange = (event) => {
    setPaidvalue(event.target.value);
  };

  const amcvalueChange = (event) => {
    setAmcvalue(event.target.value);
    setOrgvalue(event.target.value)
  };

  const paidBalanceChange = (event) => {
    setPaidbalvalue(event.target.value);
  };
  
  // GST Calculation

  const originalAmount = orgvalue;

  const GSTPercentage = 18;

  const GSTAmount = (originalAmount * GSTPercentage) / 100;

  const totalAmount =  Number(originalAmount) + Number(GSTAmount);

  const balanceAmount = paidbalvalue === '' ? totalAmount - paidvalue : totalAmount - paidvalue - paidbalvalue;

  const balpaid = paidbalvalue;

  const now = new Date();
  const currentYear = now.getFullYear();

  
  //const paymentStatus = totalAmount !== paidvalue ? "Pending" : "Completed";

  return (  
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-account-multiple-plus menu-icon" />
            </span> Payment Status
          </h3>
        </div>
            <div className="row"> 
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form className="form-sample"  onSubmit={handleSubmit(onSubmitformregister)}>
                    <br></br>
                      <div className="form-group">
                        <label>Client Type &nbsp;<span style={{ color: 'red' }}>*</span></label>
                          <select className="form-control" id="clienttype" value={selectedValue} name="clienttype" {...register("clienttype", { required: true,onChange:handleDropdownChange })} aria-invalid={errors?.clienttype ? "true" : "false"}>
                          <option value="">Select Client</option>
                            <option value="NewSales">New Sales</option>
                            <option value="AMC">AMC</option>
                            <option value="Outstanding">Outstanding</option>
                          </select>
                          {errors?.clienttype?.type === 'required' &&  <div className='text-danger text_error'><label className="errlabel">Please select Client Type</label>
                          </div>}
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <select className="form-control" name="congregation"
                            {...register("congregation", { required: true,onChange: CongregationSelect })} aria-invalid={errors?.congregation ? "true" : "false"}>
                              <option value="">Select Congregation</option>
                              {  congre && congre.map(item => (
                                <option value={item.id}>{item.congregation  }</option>)) 
                              }
                            </select>
                            {errors?.congregation?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please select Congregation</label></div>}
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
                                  <option value={item.id}>{item.province  }</option>))
                                }
                            </select>
                            {errors?.province?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Please select Province</label></div>}
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
                            {errors?.product?.type === 'required' &&  <div className='text-danger text_error'><label className="errlabel">Please select Product</label> 
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
                            <input type="text" className="form-control" name="financialyear" 
                            {...register("financialyear", { required: true,pattern:/^\d{4}-\d{4}$/})}
                            aria-invalid={errors?.financialyear ? "true" : "false"}  />
                            {errors?.financialyear?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Financial Year is required</label></div>}
                            {errors?.financialyear?.type === 'pattern' && <div className='text-danger text_error'><label className="errlabel">Please enter following format YYYY-YYYY </label></div>}
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
                            {errors?.pi?.type === 'required' &&  <div className='text-danger text_error'><label className="errlabel">Please select P/I</label>
                        </div>}
                        </div>
                        {/* AMC Extra Fields Start */}
                        {selectedValue === 'AMC' && (
                        <div className="form-group">
                          <label>Renewel Month &nbsp;<span style={{ color: 'red' }}>*</span>
                          </label>
                          <input type="month" className="form-control" name="renewelmonth"
                              {...register("renewelmonth", { required: true })}
                              aria-invalid={errors?.renewelmonth ? "true" : "false"}  />
                              {errors?.renewelmonth?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">AMC Date is required</label></div>}
                        </div>
                        )}
                        {selectedValue === 'AMC' && (
                        <div className="form-group">
                          <label>AMC Value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="amcvalue" name="amcvalue" value={amcvalue}
                             {...register("amcvalue", { required: true,onChange:amcvalueChange ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.amcvalue ? "true" : "false"}  />
                             {errors?.amcvalue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">AMC Value is required</label></div>}
                             {errors?.amcvalue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">AMC Value can contain only Numbers</label></div>}
                        </div>
                        )}
                        
                      {/* AMC Extra Fields End */}
                      {selectedValue === "NewSales" && (
                        <div className="form-group">
                          <label>Project Value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="projectvalue"
                             {...register("projectvalue", { required: true,onChange:projectvalueChange ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.projectvalue ? "true" : "false"}  />
                             {errors?.projectvalue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Project Value is required</label></div>}
                             {errors?.projectvalue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Project Value can contain only Numbers</label></div>}
                        </div> 
                      )}

                      {selectedValue === "Outstanding" && (
                        <div className="form-group">
                          <label>Project Value&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="projectvalue"
                             {...register("projectvalue", { required: true,onChange:projectvalueChange ,pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.projectvalue ? "true" : "false"}  />
                             {errors?.projectvalue?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Project Value is required</label></div>}
                             {errors?.projectvalue?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Project Value can contain only Numbers</label></div>}
                        </div> 
                      )}

                        <div className="form-group">
                          <label>GST</label>
                          <input type="text" className="form-control" id="gst" name="gst" value={GSTAmount} disabled {...register("gst")} />
                        </div>

                        <div className="form-group">
                          <label>Total</label>
                          <input type="text" className="form-control" id="total" name="total" value={totalAmount} disabled {...register("total")} />
                        </div>

                        <div className="form-group">
                          <label>Paid</label>
                            <input type="text" className="form-control" name="paid" value={paidvalue} {...register("paid", {onChange:paidvalueChange, pattern: {value: /^[0-9\b]+$/, } })}  />
                             {errors?.paid?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Paid Value can contain only Numbers</label></div>}
                        </div>

                        <div className="form-group">
                          <label>Balance</label>
                          <input type="text" className="form-control" id="balance" name="balance" value={balanceAmount}
                           {...register("balance")} disabled/>
                        </div>

                      {/* Outstanding Extra Fields Start */}
                      {selectedValue === 'Outstanding' && (
                        <div className="form-group">
                          <label>Balance Paid <b>{currentYear}-{currentYear + 1}</b></label>
                            <input type="text" className="form-control"id="balancepaid" name="balancepaid" value={paidbalvalue}
                             {...register("balancepaid", {onChange:paidBalanceChange, pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.balancepaid ? "true" : "false"}  />
                             {errors?.balancepaid?.type === "pattern" && <div className='text-danger text_error '><label className="errlabel">Balance Paid field can contain only numbers</label></div>}
                        </div>
                      )}
                      {/* Outstanding Extra Fields End */}

                        {/* <div className="form-group">
                          <label>Status</label>
                          <input type="text" className="form-control" id="status" name="status" value={paymentStatus} readOnly {...register("status")} />
                        </div> */}

                      <div className="text-center">
                        <button className="btn btn-gradient-primary font-weight-bold " type="submit">Save</button>
                        &nbsp; &nbsp; &nbsp; 
                        <Link to="/Religio/PaymentStatus" className="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
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