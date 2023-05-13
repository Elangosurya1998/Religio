import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../includes/Navbar";

function Housecommunitycreate() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });

  const [isEditable, setIsEditable] = useState(false);
  const toggleEditability = () => {
    isEditable && handleSubmit(onSubmitHousecommunitycreate)
    setIsEditable(!isEditable);

  };

  // const navigate = useNavigate();

  // const handleNavigation =()=>{
  //   navigate({
  //     pathname:"/Religio/Tab",
  //     search:"?active=2"
  //   })
  // }

  const { id } = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/housecommunityedit/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      reset(resp.data[0]);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

  function onSubmitHousecommunitycreate(data, e) {
    if(isEditable) return
    axios.put(`${ApiUrl}/housecommunityupdate/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            'Updated Successfully..!',
            'Housecommunity Data Updated ..',
            'success'
          );
          // navigate('/Religio/Memberdata');
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
          <div className="row">
          
            
          </div>

          <form className="form-sample" onSubmit={handleSubmit(onSubmitHousecommunitycreate)} >

            {/* <div className="row"><b className="card-description">House / Community</b></div> */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Status&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <select className="form-control" name="housestatus"
                  {...register("housestatus", { required: true })}
                  aria-invalid={errors?.housestatus ? "true" : "false"} disabled={!isEditable}>
                  <option value="" >Select Project Status</option>
                  <option value="Completed">Completed</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Notstrated">Not Started</option>
                </select>

                {errors?.housestatus?.type === 'required' && <div className='text-danger text_error'>Please Choose satatus</div>}
              </div>
              <div className=" form-group col-md-6">
                <label>Target Date&nbsp;<span style={{ color: 'red' }}>*</span></label>
                <input type="date" className="form-control" placeholder="YYYY" name="housedate"
                  {...register("housedate", { required: true })}
                  aria-invalid={errors?.housedate ? "true" : "false"} disabled={!isEditable} />
                {errors?.housedate?.type === 'required' && <div className='text-danger text_error'><label className="errlabel">Target Date is required</label></div>}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" class="btn btn-gradient-light" onClick={toggleEditability} value="Submit" >
                {isEditable ? 'Save' : 'Edit'}
              </button>
           
            </div>




          </form>
        </div>
      </div>
    </div>
    // </div>

  );
}

export default Housecommunitycreate;