import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function MobileappEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });  

  const {id} = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/mobileappedit/${id}`).then((res) => {
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
    search:"?active=4"
  })
}

  function onSubmitmobileappedit(data,e){
   console.log(data);
    axios.put(`${ApiUrl}/mobileappupdate/${id}`,data)
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
          </span> Basic Data Status
        </h3>
      </div>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">

                <form className="form-sample" onSubmit={handleSubmit(onSubmitmobileappedit) } >                                

                  <div className="form-row">
                      <div className="form-group col-md-6">
                            <label>Status&nbsp;<span style={{ color: 'red' }}>*</span></label>
                              <select className="form-control" name="mobilestatus"
                             {...register("mobilestatus", { required: true })}
                            aria-invalid={errors?.mobilestatus ? "true" : "false"}>
                                <option value="" >Select Project Status</option>
                                <option value="Completed">Completed</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Notstrated">Not Started</option>
                              </select>
                           
                              {errors?.mobilestatus?.type === 'required' && <div className='text-danger text_error'>Please Choose satatus</div>}
                            </div>
                            <div className=" form-group col-md-6">
                            <label>Target Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="date" className="form-control" placeholder="YYYY" name="mobiledate"
                             {...register("mobiledate", { required: true })}
                             aria-invalid={errors?.mobiledate ? "true" : "false"}  />
                             {errors?.mobiledate?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Target Date is required</label></div>}
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

  export default MobileappEdit;