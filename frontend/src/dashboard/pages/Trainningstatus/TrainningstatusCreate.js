import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from "../../includes/Navbar";

function Trainningstatuscreate() {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' }); 
    const [state, setState] = useState("");
    
    const navigate = useNavigate();

    const handleNavigation =()=>{
      navigate({
        pathname:"/Religio/Tab",
        search:"?active=6"
      })
    }
  
    function onSubmtionlinecreate(datas,e){
     console.log(datas);
     
      axios.post(`${ApiUrl}/onlinemeetstatuscreate`,datas)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
              'Online status Successfully..!',
              'Online status Added ..',
              'success'
            );
            // navigate('/Religio/Tab');
            handleNavigation()
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

    

    function onSubmitonsitecreate(data,e){
      console.log(data);
     
      axios.post(`${ApiUrl}/onsitemeetstatuscreate`,data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
              'Onsite status Successfully..!',
              'Onsite status Added ..',
              'success'
            );
            // navigate('/Religio/Tab');
            handleNavigation()
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


 
  return (  

   
    <div className="content-wrapper">
        <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span> Trainning Status
        </h3>
      </div>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">


                    <div className="form-group">
                    <div className="form-group col-md-6">
                    <h2 className="card-title">Trainning Status</h2>
                    <div class="row">
                    <div className="form-group col-md-6">
                    <input class="form-check-input" type="checkbox"  checked={state === "online"} onChange={() => setState("online")  } />
                    <p>Online</p>
                    </div>
                    <div className="form-group col-md-6">
                    <input class="form-check-input" type="checkbox" checked={state === "onsite"} onChange={() => setState("onsite")} />         
                    <p>Onsite</p>
                    </div>
                    </div>
                    </div>
                    </div>
                {
                state === 'online' ?
               
                <form className="form-sample" onSubmit={handleSubmit(onSubmtionlinecreate) } >     
                 <div className="row"><b className="card-description"> Online Stataus </b></div>    

                   <div className="form-group">
                  <div className="form-group col-md-6">
                    <label for="produsername">Meeting &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <div className="form-group col-md-6">
                    <p><label>
                        <input type="radio" className="form-check-input" name="onlinemeeting" id="YES" value="Google meet" 
                      {...register("onlinemeeting")}/>
                          Google meet
                          </label>
                          </p>
                      <p>
                        <label>
                        <input type="radio" className="form-check-input" name="onlinemeeting" id="NO" value="Zoom"
                        {...register("onlinemeeting")}
                         />
                       Zoom</label>
                        </p>
                        <p>
                        <label>
                        <input type="radio" className="form-check-input" name="onlinemeeting" id="NO" value="Skype"
                        {...register("onlinemeeting")}
                         />
                        Skype</label>
                        </p>
                        </div>
                  </div>
                  </div>

                     <div className="form-row">
                     
                            <div className=" form-group col-md-6">
                            <label> Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="date" className="form-control" placeholder="YYYY" name="onlinedate"
                             {...register("onlinedate", { required: true })}
                             aria-invalid={errors?.onlinedate ? "true" : "false"}  />
                             {errors?.onlinedate?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Target Date is required</label></div>}
                            </div>

                          <div className="form-group col-md-6">
                            <label for="exampleInputUsername">Number of hours&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="onlinehours" placeholder="Number of hours"
                            {...register("onlinehours", { required: true })}
                            aria-invalid={errors?.onlinehours ? "true" : "false"}  />
                            {errors?.onlinehours?.type === 'required' && <div className='text-danger text_error'>Number of hours is required</div>}
                           
                          </div>
                      </div>  
        
                      <div className="form-row">
                      <div className="form-group col-md-6">
                            <label for="exampleInputUsername">Rating&nbsp;&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="onlinerating" placeholder="Rating"
                            {...register("onlinerating", { required: true })}
                            aria-invalid={errors?.onlinerating ? "true" : "false"}  />
                            {errors?.onlinerating?.type === 'required' && <div className='text-danger text_error'>Rating is required</div>}
                           
                          </div>
                            <div className=" form-group col-md-6">
                            <label>File Attachment&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="File" className="form-control" name="FileAttachment" 
                              {...register("FileAttachment", { required: true})}
                              aria-invalid={errors?.FileAttachment ? "true" : "false"}/>
                               {errors?.FileAttachment?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Choose a File</label></div>}
                            </div>
                      </div> 
      

                     <div className="text-center">
                    <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                    &nbsp; &nbsp; &nbsp; 
                   <div onClick={handleNavigation} class="btn btn-gradient-primary font-weight-bold ">Cancel</div>
                   </div>
                    </form> 
                     : 
                <form className="form-sample" onSubmit={handleSubmit(onSubmitonsitecreate) } >
                    <div className="row"><b className="card-description"> Onsite Stataus </b></div>      
                   
                     <div className="form-row">
                     
                            <div className=" form-group col-md-6">
                            <label> Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="date" className="form-control" placeholder="YYYY" name="onsitedate"
                             {...register("onsitedate", { required: true })}
                             aria-invalid={errors?.onsitedate ? "true" : "false"}  />
                             {errors?.onsitedate?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Target Date is required</label></div>}
                            </div>

                          <div className="form-group col-md-6">
                            <label for="exampleInputUsername">Number of days&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="onsitedays" placeholder="Number of days"
                            {...register("onsitedays", { required: true })}
                            aria-invalid={errors?.onsitedays ? "true" : "false"}  />
                            {errors?.onsitedays?.type === 'required' && <div className='text-danger text_error'>Number of days is required</div>}

                          </div>
                      </div>  

                      <div class="form-row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputUsername">Place&nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" name="textusername" placeholder="Place"
                    {...register("onsiteplace", { required: true, pattern: {value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.onsiteplace ? "true" : "false"}  />
                    {errors?.onsiteplace?.type === 'required' && <div className='text-danger text_error'>Onsiteplace is required</div>}
                    {errors?.onsiteplace?.type === "pattern" && <div className='text-danger text_error '>Onsiteplace can contain only alphabets</div>}
                  </div>

                  <div className="form-group col-md-6">
                    <label for="exampleInputPassword">Training Expansive&nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" name="expensive" placeholder="Training Expansive"
                    {...register("expensive", { required: true })}
                    aria-invalid={errors?.expensive ? "true" : "false"}  />
                    {errors?.expensive?.type === 'required' && <div className='text-danger text_error'>Training Expansive is required</div>}
                  </div>
                  </div>
        
                      <div className="form-row">
                      <div className="form-group col-md-6">
                            <label for="exampleInputUsername">Rating&nbsp;&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" name="hours" placeholder="Number of onsiterating"
                            {...register("onsiterating", { required: true })}
                            aria-invalid={errors?.onsiterating ? "true" : "false"}  />
                            {errors?.onsiterating?.type === 'required' && <div className='text-danger text_error'>Number of hours is required</div>}
                           
                          </div>
                            {/* <div className=" form-group col-md-6">
                            <label>File Attachment&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="File" className="form-control" name="onsite" 
                              {...register("onsite", { required: true})}
                              aria-invalid={errors?.onsite ? "true" : "false"}/>
                               {errors?.onsite?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Choose a File</label></div>}
                            </div> */}
                            <div className=" form-group col-md-6">
                            <label>File Attachment&nbsp;<span style={{ color: 'red' }}>*</span></label>
                             <input type="File" className="form-control" name="onsite" 
                              {...register("onsite", { required: true})}
                              aria-invalid={errors?.onsite ? "true" : "false"}/>
                               {errors?.onsite?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Choose a File</label></div>}
                            </div>
                      </div> 
      

                     <div className="text-center">
                    <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                    &nbsp; &nbsp; &nbsp; 
                   <div onClick={handleNavigation} class="btn btn-gradient-primary font-weight-bold ">Cancel</div>
                   </div>
              
                    </form>
              }

              
                  </div>
                </div>
              </div>
            </div>
    
         );
    }

  export default Trainningstatuscreate;