import axios from "axios";
import { useForm } from "react-hook-form";

function ClientRegistration() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });  

  function onSubmitform(data){
    axios.post('https://jsonplaceholder.typicode.com/posts',{data})
    .then(Response => console.log(Response))
    .catch(err =>console.log(err))
   
  }
  return (    
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-account-plus menu-icon" />
            </span> Client Registration
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
                    <form className="form-sample" onSubmit={handleSubmit(onSubmitform)}>
                      <br></br>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Congregation</label>
                            <div className="col-sm-9">
                            <select className="form-control" name="Congregation"
                             {...register("Congregation", { required: true })}
                             aria-invalid={errors?.Congregation ? "true" : "false"}>
                            <option value="">Select Congregation</option>
                                <option>Con</option>
                                <option>gregation</option>
                              </select>
                              {errors?.Congregation?.type === 'required' && <div className='text-danger text_error'>Please Choose One Congregation</div>}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Province</label>
                            <div className="col-sm-9">
                            <select className="form-control"  name="Province"
                            {...register("Province", { required: true })}
                            aria-invalid={errors?.Province ? "true" : "false"}>
                                <option value="">Select Province</option>
                                <option>vince</option>
                              </select>
                              {errors?.Province?.type === 'required' && <div className='text-danger text_error'>Please Choose One Province</div>}

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="Name"
                            {...register("Name", { required: true, pattern: {value: /^[A-Za-z ]+$/, } })}
                             aria-invalid={errors?.Name ? "true" : "false"}  />
                             {errors?.Name?.type === 'required' && <div className='text-danger text_error'>Name is required</div>}
                             {errors?.Name?.type === "pattern" && <div className='text-danger text_error '>Name can contain only alphabets</div>}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Place</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="Place" 
                            {...register("Place", { required: true, pattern: {value: /^[A-Za-z ]+$/, } })}
                            aria-invalid={errors?.Place ? "true" : "false"}  />
                            {errors?.Place?.type === 'required' && <div className='text-danger text_error'>Place is required</div>}
                            {errors?.Place?.type === "pattern" && <div className='text-danger text_error '>Place can contain only alphabets</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Client Type</label>
                            <div className="col-sm-9">
                            <select className="form-control" name="ClientType"
                            {...register("ClientType", { required: true })}
                            aria-invalid={errors?.ClientType ? "true" : "false"}>
                                <option value="">Select Client Type</option>
                                <option>New</option>
                              </select>
                              {errors?.ClientType?.type === 'required' && <div className='text-danger text_error'>Please Choose One ClientType</div>}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Financial Year</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" placeholder="YYYY" max="2023" name="FinancialYear"
                             {...register("FinancialYear", { required: true , pattern: {value: /^[0-9\b]+$/, } })}
                             aria-invalid={errors?.FinancialYear ? "true" : "false"}  />
                             {errors?.FinancialYear?.type === 'required' && <div className='text-danger text_error'>Financial Year is required</div>}
                             {errors?.FinancialYear?.type === "pattern" && <div className='text-danger text_error '>Financial Year can contain only Years</div>}
                           </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Client Code</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name="ClientCode" 
                            {...register("ClientCode", { required: true, pattern: {value: /^[0-9\b]+$/, } })}
                            aria-invalid={errors?.ClientCode ? "true" : "false"}/>
                             {errors?.ClientCode?.type === 'required' && <div className='text-danger text_error'>Client Code is required</div>}
                            {errors?.ClientCode?.type === "pattern" && <div className='text-danger text_error '>Client Code can contain only Numbers</div>}
                           </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Date of Joining</label>
                            <div className="col-sm-9">
                              <input type="Date" className="form-control" name="DateofJoining" 
                              {...register("DateofJoining", { required: true })}
                              aria-invalid={errors?.DateofJoining ? "true" : "false"}  />
                              {errors?.DateofJoining?.type === 'required' && <div className='text-danger text_error'>Date of Joining is required</div>}
                            </div>
                          </div>
                        </div> 
                      </div>
                      <div className="row">
                      <div className="col-md-6">
                           <div className="form-group row">
                             <label className="col-sm-3 col-form-label">Contract Signed Date</label>
                             <div className="col-sm-9">
                               <input type="Date" className="form-control" name="DateofContractSigning" 
                               {...register("DateofContractSigning", { required: true })}
                               aria-invalid={errors?.DateofContractSigning ? "true" : "false"}  />
                               {errors?.DateofContractSigning?.type === 'required' && <div className='text-danger text_error'>Date of Contract Signing is required</div>}
                             </div>
                           </div>
                         </div>
                         <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">AMC Start Date</label>
                            <div className="col-sm-9">
                              <input type="Date" className="form-control" name="AMCDate"
                              {...register("AMCDate", { required: true })}
                              aria-invalid={errors?.AMCDate ? "true" : "false"}  />
                              {errors?.AMCDate?.type === 'required' && <div className='text-danger text_error'>AMC Date is required</div>}
                           </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-md-6">
                           <div className="form-group row">
                             <label className="col-sm-3 col-form-label">Project Value</label>
                             <div className="col-sm-9">
                             <input type="text" className="form-control" name="ProjectValue" 
                             {...register("ProjectValue", { required: true , pattern: {value: /^[A-Za-z ]+$/, } })}
                             aria-invalid={errors?.ProjectValue ? "true" : "false"}  />
                             {errors?.ProjectValue?.type === 'required' && <div className='text-danger text_error'>Project Value is required</div>}
                             {errors?.ProjectValue?.type === "pattern" && <div className='text-danger text_error '>Project Value can contain only alphabets</div>}
                          </div>
                           </div>
                         </div>
                         <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">AMC value</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control"  name="AMCvalue"
                                {...register("AMCvalue", { required: true , pattern: {value: /^[A-Za-z ]+$/, } })}
                                aria-invalid={errors?.AMCvalue ? "true" : "false"}  />
                                {errors?.AMCvalue?.type === 'required' && <div className='text-danger text_error'>AMC value is required</div>}
                                {errors?.AMCvalue?.type === "pattern" && <div className='text-danger text_error '>AMC value can contain only alphabets</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <p className="card-description"> Address </p> */}
                      <div className="row">
                      <div className="col-md-6">
                           <div className="form-group row">
                             <label className="col-sm-3 col-form-label">Project Status</label>
                             <div className="col-sm-9">
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
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group row">
                             <label className="col-sm-3 col-form-label">File Attachment</label>
                             <div className="col-sm-9">
                             <input type="File" className="form-control" name="FileAttachment"
                              {...register("FileAttachment", { required: true})}
                              aria-invalid={errors?.FileAttachment ? "true" : "false"}/>
                               {errors?.FileAttachment?.type === 'required' && <div className='text-danger text_error'>Choose a File</div>}
                              </div>
                           </div>
                         </div>
                      </div>   
                      <div className="text-center">
                      <button class="btn btn-gradient-primary font-weight-bold " type="submit">Register</button>
                      </div>  
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
         );
    }

  export default ClientRegistration;