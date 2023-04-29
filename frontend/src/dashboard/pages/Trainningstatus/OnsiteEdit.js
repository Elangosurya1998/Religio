import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function OnsitedataEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });  

  const {id} = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/onsitestatusedit/${id}`).then((res) => {
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

  function onSubmitonsitedata(data,e){
   console.log(data);
    axios.put(`${ApiUrl}/onsitestatusupdate/${id}`,data)
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

              <form className="form-sample" onSubmit={handleSubmit(onSubmitonsitedata) } >
                    <div className="row"><b className="card-description"> Onsite Status </b></div>      
                   
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

  export default OnsitedataEdit;