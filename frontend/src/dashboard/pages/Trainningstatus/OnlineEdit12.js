import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function OnlinetrdataEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });  

  const {id} = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/onlinetatusedit/${id}`).then((res) => {
        return res.json();
    }).then((resp) => {
       reset(resp.data[0]);
    }).catch((err) => {
        console.log(err.message);
    })
  }, [])



const navigate = useNavigate();


const handleNavigation=()=>{
  navigate({
    pathname:"/Religio/Tab",
    search:"?active=6"
  })
}

  function onSubmitonlineupdate(data,e){
   console.log(data);
    axios.put(`${ApiUrl}/onlinestatusupdate/${id}`,data)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire(
            'Updated Successfully..!',
            'Project status Data Updated ..',
            'success'
          );
          // navigate('/Religio/Memberdata');
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

              <form className="form-sample" onSubmit={handleSubmit(onSubmitonlineupdate) } >      
                 <div className="row"><b className="card-description"> Online Status </b></div>    

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
                   {/* <Link to="/Religio/Memberdata" class="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                   </div> */}
                    <div onClick={handleNavigation} class="btn btn-gradient-primary font-weight-bold ">Cancel</div>
                    </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
    
         );
    }

  export default OnlinetrdataEdit;