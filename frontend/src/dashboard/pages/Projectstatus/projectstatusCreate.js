import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from "../../includes/Navbar";

function Projectstatuscreate() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' }); 
  
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetch(`${ApiUrl}/projectstatus`).then((res) => {
  //       return res.json();
  //   }).then((resp) => {
  //     SetProject(resp.data);
  //   }).catch((err) => {
  //       console.log(err.message);
  //   })
  // }, [])

//   const [ congre, Project ] = useState([]);

// useEffect(() => {
//   fetch(`${ApiUrl}/Religio/Province`).then((res) => {
//       return res.json();
//   }).then((resp) => {
//     SetProvince(resp.data);
//   }).catch((err) => {
//       console.log(err.message);
//   })
// }, [])


// const [ Pro, SetProjectstatus ] = useState([]);

  function onSubmitProjectstatus(data,e){
   console.log(data);
   
    axios.post(`${ApiUrl}/projectstatuscreate`,data)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire(
            'Project status Successfully..!',
            'Project status Added ..',
            'success'
          );
          navigate('/Religio/ProjectstatusLayouts');
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
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
             <h2 className="card-title">Project Status</h2>

                <form className="form-sample" onSubmit={handleSubmit(onSubmitProjectstatus) } >
                                   
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="Congregation">Congregation</label>
                    <select className="form-control" id="Congregation" name="congregation"
                    {...register("congregation", { required: true })}
                    aria-invalid={errors?.congregation ? "true" : "false"}>
                      <option value="">--Congregation--</option>
                      <option value="Congregation of Divine">Congregation of Divine</option>
                      <option value="Congregation of Holy Cross">Congregation of Holy Cross</option>
                      <option value="Congregation of Maronite Lebanese Missionaries">Congregation of Maronite Lebanese Missionaries</option>
                      <option value="Congregation of the Mission">Congregation of the Mission</option>
                    </select>
                    {errors?.congregation?.type === 'required' && <div 
                    className='text-danger text_error'>Please Choose One congregation</div>}
                  </div>

                  <div className="form-group col-md-6">
                    <label for="province">Province</label>
                    <select className="form-control" id="province" name="province"
                    {...register("province", { required: true })}
                    aria-invalid={errors?.province ? "true" : "false"}>
                      <option value="">--Province List--</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                    {errors?.province?.type === 'required' && <div 
                    className='text-danger text_error'>Please Choose One province</div>}
                  </div>
                  </div>

                  <div className="form-group">
                    <label for="exampleInputName">Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name"
                    {...register("name", { required: true, pattern: {value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.name ? "true" : "false"}  />
                    {errors?.name?.type === 'required' && <div className='text-danger text_error'>Name is required</div>}
                    {errors?.name?.type === "pattern" && <div className='text-danger text_error '>Name can contain only alphabets</div>}
                  </div>

                  <div className="form-group">
                    <label for="exampleInputServer">Server</label>
                    <input type="text" className="form-control" name="dataserver" placeholder="Server"
                    {...register("dataserver", { required: true })}
                    aria-invalid={errors?.dataserver ? "true" : "false"} />
                    {errors?.dataserver?.type === 'required' && <div className='text-danger text_error'>Server is required</div>}
                  </div>

                  <div className="form-group">
                    <label for="exampleinstanceconfig">Instanceconfig/Setup</label>
                    <input type="text" className="form-control" name="instanceconfig" placeholder="Instanceconfig/Setup"
                    {...register("instance", { required: true })}
                    aria-invalid={errors?.instance ? "true" : "false"} />
                     {errors?.instance?.type === 'required' && <div className='text-danger text_error'>Instanceconfig/Setup is required</div>}
                  </div>


                    <div className="form-group">
                        <label for="exampleInputTestURL">Test URL</label>
                        <div className="form-check">
                        <p>
                        <label>
                        <input type="radio" className="form-check-input" name="testURL" id="YES" value="Yes" />
                          Yes</label>
                        </p>
                        <p>
                        <label>
                        <input type="radio" className="form-check-input" name="testURL" id="NO" value="No"
                        {...register("testURL", { required: true })}
                        aria-invalid={errors?.testURL ? "true" : "false"} />
                         {errors?.Yes?.type === 'required' && <div className='text-danger text_error'>dghgfhgfh</div>}
                        No</label>
                        </p>
                      </div>
                    </div>


                  <div class="form-row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputUsername">Text Username</label>

                    <input type="text" className="form-control" name="textusername" placeholder="Text Username"
                    {...register("textusername", { required: true, pattern: {value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.textusername ? "true" : "false"}  />
                    {errors?.textusername?.type === 'required' && <div className='text-danger text_error'>Username is required</div>}
                    {errors?.textusername?.type === "pattern" && <div className='text-danger text_error '>Username can contain only alphabets</div>}
                  </div>

                  <div className="form-group col-md-6">
                    <label for="exampleInputPassword">Text Password</label>
                    <input type="text" className="form-control" name="textpassword" placeholder="Text Password"
                    {...register("textpassword", { required: true, pattern: {value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.textpassword ? "true" : "false"}  />
                    {errors?.textpassword?.type === 'required' && <div className='text-danger text_error'>Password is required</div>}
                    {errors?.textpassword?.type === "pattern" && <div className='text-danger text_error '>Password can contain only alphabets</div>}
                  </div>
                  </div>

                  <div className="text-center">
                      <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                
                    &nbsp; &nbsp; &nbsp; 
                <Link to="/Religio/ProjectstatusLayouts" class="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                   </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
    
         );
    }

  export default Projectstatuscreate;