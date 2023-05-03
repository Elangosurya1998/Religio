import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from "../../includes/Navbar";

function Memberdatacreate() {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' }); 
    
    const navigate = useNavigate();

    const handleNavigation =()=>{
      navigate({
        pathname:"/Religio/Tab",
        search:"?active=3"
      })
    }
  
    function onSubmitmemberdatacreate(data,e){
     console.log(data);
     
      axios.post(`${ApiUrl}/memberdatacreate`,data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
              'Project status Successfully..!',
              'Project status Added ..',
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
          </span> Member Data
        </h3>
      </div>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">

                <form className="form-sample" onSubmit={handleSubmit(onSubmitmemberdatacreate) } >                                

                 <div className="form-row">
                      <div className="form-group col-md-6">
                            <label>Status&nbsp;<span style={{ color: 'red' }}>*</span></label>
                              <select className="form-control" name="memberstatus"
                             {...register("memberstatus", { required: true })}
                            aria-invalid={errors?.memberstatus ? "true" : "false"}>
                                <option value="" >Select Project Status</option>
                                <option value="Completed">Completed</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Notstrated">Not Started</option>
                              </select>
                           
                              {errors?.memberstatus?.type === 'required' && <div className='text-danger text_error'>Please Choose Member Data satatus</div>}
                            </div>
                            <div className=" form-group col-md-6">
                            <label>Target Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                            <input type="date" className="form-control" placeholder="YYYY" name="memberdate"
                             {...register("memberdate", { required: true })}
                             aria-invalid={errors?.memberdate ? "true" : "false"}  />
                             {errors?.memberdate?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Target Date is required</label></div>}
                            </div>
                      </div>  


                     <div className="text-center">
                    <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                    &nbsp; &nbsp; &nbsp; 
                   <div onClick={handleNavigation} class="btn btn-gradient-primary font-weight-bold ">Cancel</div>
                   </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
    
         );
    }

  export default Memberdatacreate;