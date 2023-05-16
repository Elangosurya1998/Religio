import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../includes/Navbar";

function Projectstatuscreate({dash,data}) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();

  // edit button ennable & disable
  const [isEditable, setIsEditable] = useState(false);
  const toggleEditability = () => {
    isEditable && handleSubmit(onSubmitProjectstatus)
    setIsEditable(!isEditable);
    
  };


  const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const myStyle = {
  position: 'absolute',
  right: '10px',
  top: '70%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  cursor: 'pointer'
  };
 
  // const onSubmitProjectstatus = data => console.log(data);

  // const onSubmit = (save) => {
  //   console.log(save); // handle form data here
  // };


  // function onSubmitProjectstatus(save, e) {
 
  //   axios.post(`${ApiUrl}/projectstatuscreate`, save)
  //     .then((response) => {
  //       console.log(response);
  //       if (response.status === 200) {
  //         Swal.fire(
  //           'Project status Successfully..!',
  //           'Project status Added ..',
  //           'success'
  //         );
  //         // navigate('/Religio/Tab');
  //         // handleNavigation()
  //         // e.target.reset();
  //       }
  //     }).catch((err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: err.message
  //       })
  //     })

  // }

  const { id } = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/projectstatusedit/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      reset(resp.data[0]);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  function onSubmitProjectstatus(data, e) {
    if(isEditable) return
    console.log(data);
    axios.put(`${ApiUrl}/projectstatusupdate/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            'Updated Successfully..!',
            'Project status Data Updated ..',
            'success'
          );
          // navigate('/Religio/ProjectstatusLayouts');
          // handleNavigation()
          // e.target.reset();
        }
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err.message
        })
      })

  }







  return (

    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          
          <form className="form-sample" onSubmit={handleSubmit(onSubmitProjectstatus)} >

            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="exampleInputServer">Server&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="dataserver" placeholder="Server"
                  {...register("dataserver", { required: true })}
                  aria-invalid={errors?.dataserver ? "true" : "false"} disabled={!isEditable} />
                {errors?.dataserver?.type === 'required' && <div className='text-danger text_error'>Server is required</div>}
              </div>

              <div className="form-group col-md-6">
                <label for="produsername">Instanceconfig/Setup&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <div className="form-group col-md-6">
                  <p><label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" className="form-check-input" name="instance" id="YES" value="Yes"
                      {...register("instance")} disabled={!isEditable} />
                    Yes
                  </label>
                  </p>
                  <p><label> &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" className="form-check-input" name="instance" id="NO" value="No"
                      {...register("instance")} disabled={!isEditable} />
                    No</label>
                  </p>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div className="form-group col-md-6">
                <label for="exampletestURL">Test URL&nbsp;<span style={{ color: 'red' }}>*</span></label>

                <input type="text" className="form-control" name="testURL" placeholder="Test URL"
                  {...register("testURL", { required: true, pattern: { value: regex } })}
                  aria-invalid={errors?.testURL ? "true" : "false"} disabled={!isEditable} />
                {errors?.testURL?.type === 'required' && <div className='text-danger text_error'>Test URL is required</div>}
                {errors?.testURL?.type === "pattern" && <div className='text-danger text_error '>only used live URL</div>}
              </div>
              <div className="form-group col-md-6">
                <label for="exampleInputPassword">Production URL&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="prodURL" placeholder="Production URL"
                  {...register("prodURL", { required: true, pattern: { value: regex } })}
                  aria-invalid={errors?.prodURL ? "true" : "false"} disabled={!isEditable} />
                {errors?.prodURL?.type === 'required' && <div className='text-danger text_error'>Production URL is required</div>}
                {errors?.prodURL?.type === "pattern" && <div className='text-danger text_error '>only used live URL</div>}
              </div>
            </div>


            <div class="form-row">
              <div className="form-group col-md-6">
                <label for="exampleInputUsername">Test Username&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="testusername" placeholder="Text Username"
                  {...register("testusername", { required: true })}
                  aria-invalid={errors?.testusername ? "true" : "false"} autoComplete="off" disabled={!isEditable} />
                {errors?.testusername?.type === 'required' && <div className='text-danger text_error'>Username is required</div>}
              </div>

              <div className="form-group col-md-6">
                <label for="exampleInputPassword">Test Password&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input type={showPassword ? "text" : "password"} className="form-control" name="testpassword" placeholder="Text Password"
                  {...register("testpassword", { required: true })}
                  aria-invalid={errors?.testpassword ? "true" : "false"} autoComplete="off" disabled={!isEditable} />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <i className="fa fa-eye-slash" style={myStyle} />
                    : <i className="fa fa-eye" style={myStyle} />}</span>
                {errors?.testpassword?.type === 'required' && <div className='text-danger text_error'>Password is required</div>}

              </div>
            </div>


            <div class="form-row">
              <div className="form-group col-md-6">
                <label for="produsername">Production Username&nbsp;<span style={{ color: 'red' }}>*</span></label>

                <input type="text" className="form-control" name="produsername" placeholder="Product Username"
                  {...register("produsername", { required: true })}
                  aria-invalid={errors?.produsername ? "true" : "false"} autoComplete="off" disabled={!isEditable} />
                {errors?.produsername?.type === 'required' && <div className='text-danger text_error'>produsername is required</div>}
              </div>

              <div className="form-group col-md-6">
                <label for="prodpassword">Production Password&nbsp;<span style={{ color: 'red' }}>*</span></label>

                <input type={viewPassword ? "text" : "password"} className="form-control" name="prodpassword" placeholder="Production Password"
                  {...register("prodpassword", { required: true })}
                  aria-invalid={errors?.prodpassword ? "true" : "false"} autoComplete="off" disabled={!isEditable} />
                <span onClick={() => setViewPassword(!viewPassword)}>
                  {viewPassword ? <i className="fa fa-eye-slash" style={myStyle} />
                    : <i className="fa fa-eye" style={myStyle} />}</span>
                {errors?.prodpassword?.type === 'required' && <div className='text-danger text_error'>Production Password is required</div>}

              </div>
            </div>
            {isLogedIn?.role == "admin" ? (
            <div className="text-center">
              <button type="submit" class="btn btn-gradient-light" onClick={toggleEditability} value="Submit" >
                {isEditable ? 'Save' : 'Edit'}
              </button>
              {/* <div onClick={handleNavigation} class="btn btn-gradient-primary font-weight-bold ">Cancel</div> */}
            </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>

  );
}
export default Projectstatuscreate;