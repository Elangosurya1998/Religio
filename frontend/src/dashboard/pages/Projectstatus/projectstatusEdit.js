import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProjectstatusEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });

  // const id ="23";
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
  const [congre, Congregation] = useState([]);

  const handleNavigation = () => {

    navigate({
      pathname: '/Religio/Tab',
      search: '?active=1'
    });
  }

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Province`).then((res) => {
      return res.json();
    }).then((resp) => {
      SetProvince(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

  function CongregationSelect(event) {
    var id = event.target.value
    axios.get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        SetProvince(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
  }

  const [Pro, SetProvince] = useState([]);

  function onSubmitProjectstatus(data, e) {
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
          handleNavigation()
          e.target.reset();
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
    <div className="content-wrapper">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Project Status</h2>

            <form className="form-sample" onSubmit={handleSubmit(onSubmitProjectstatus)} >

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="Congregation">Congregation</label>
                  <select className="form-control" id="Congregation" name="congregation"
                    {...register("congregation", { required: true, onChange: CongregationSelect })}
                    aria-invalid={errors?.congregation ? "true" : "false"}>
                    <option value="">--Congregation--</option>
                    {
                      congre && congre.map(item => (
                        <option value={item.id}>{item.congregation}</option>))
                    }
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
                    {
                      Pro && Pro.map(item => (
                        <option value={item.id}>{item.province}</option>))
                    }
                  </select>
                  {errors?.province?.type === 'required' && <div
                    className='text-danger text_error'>Please Choose One province</div>}
                </div>
              </div>

              <div className="form-group">
                <label for="exampleInputName">Name</label>
                <input type="text" className="form-control" name="name" placeholder="Name"
                  {...register("name", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                  aria-invalid={errors?.name ? "true" : "false"} />
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
                <div className="form-group col-md-6">
                  <label for="produsername">Instanceconfig/Setup</label>
                  <div className="form-group col-md-6">
                    <p><label>
                      <input type="radio" className="form-check-input" name="instance" id="YES" value="Yes"
                        {...register("instance")} />
                      Yes
                    </label>
                    </p>
                    <p><label>
                      <input type="radio" className="form-check-input" name="instance" id="NO" value="No"
                        {...register("instance")}
                      />
                      No</label>
                    </p>
                  </div>
                </div>
              </div>


              <div class="form-row">
                <div className="form-group col-md-6">
                  <label for="exampletestURL">Test URL</label>

                  <input type="text" className="form-control" name="testURL" placeholder="Test URL"
                    {...register("testURL", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.testURL ? "true" : "false"} />
                  {errors?.testURL?.type === 'required' && <div className='text-danger text_error'>Test URL is required</div>}
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputPassword">Production URL</label>
                  <input type="text" className="form-control" name="prodURL" placeholder="Production URL"
                    {...register("prodURL", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.prodURL ? "true" : "false"} />
                  {errors?.prodURL?.type === 'required' && <div className='text-danger text_error'>Production URL is required</div>}
                </div>
              </div>


              <div class="form-row">
                <div className="form-group col-md-6">
                  <label for="exampleInputUsername">Test Username</label>
                  <input type="text" className="form-control" name="textusername" placeholder="Text Username"
                    {...register("textusername", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.textusername ? "true" : "false"} />
                  {errors?.textusername?.type === 'required' && <div className='text-danger text_error'>Username is required</div>}
                  {errors?.textusername?.type === "pattern" && <div className='text-danger text_error '>Username can contain only alphabets</div>}
                </div>

                <div className="form-group col-md-6">
                  <label for="exampleInputPassword">Test Password</label>
                  <input type="text" className="form-control" name="textpassword" placeholder="Text Password"
                    {...register("textpassword", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.textpassword ? "true" : "false"} />
                  {errors?.textpassword?.type === 'required' && <div className='text-danger text_error'>Password is required</div>}
                  {errors?.textpassword?.type === "pattern" && <div className='text-danger text_error '>Password can contain only alphabets</div>}
                </div>
              </div>


              <div class="form-row">
                <div className="form-group col-md-6">
                  <label for="produsername">Production Username</label>

                  <input type="text" className="form-control" name="produsername" placeholder="Production Username"
                    {...register("produsername", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.produsername ? "true" : "false"} />
                  {errors?.produsername?.type === 'required' && <div className='text-danger text_error'>produsername is required</div>}
                  {errors?.produsername?.type === "pattern" && <div className='text-danger text_error '>produsername can contain only alphabets</div>}
                </div>

                <div className="form-group col-md-6">
                  <label for="prodpassword">Production Password</label>
                  <input type="text" className="form-control" name="prodpassword" placeholder="Production Password"
                    {...register("prodpassword", { required: true, pattern: { value: /^[A-Za-z ]+$/, } })}
                    aria-invalid={errors?.prodpassword ? "true" : "false"} />
                  {errors?.prodpassword?.type === 'required' && <div className='text-danger text_error'>Production Password is required</div>}
                  {errors?.prodpassword?.type === "pattern" && <div className='text-danger text_error '>Production Password can contain only alphabets</div>}
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

export default ProjectstatusEdit;