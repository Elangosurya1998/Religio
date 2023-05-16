import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../includes/Navbar";

function Datasupportcreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  // edit button ennable & disable
  const [isEditable, setIsEditable] = useState(false);
  const toggleEditability = () => {
    isEditable && handleSubmit(onSubmitDatasupportcreate);
    setIsEditable(!isEditable);
  };

  // const handleNavigation =()=>{
  //   navigate({
  //     pathname:"/Religio/Tab",
  //     search:"?active=7"
  //   })
  // }

  const { id } = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/Datasupportedit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  function onSubmitDatasupportcreate(data, e) {
    if (isEditable) return;
    axios
      .put(`${ApiUrl}/Datasupportupdate/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            "Updated Successfully..!",
            "Data Support Updated ..",
            "success"
          );
          // navigate('/Religio/Memberdata');
          //  handleNavigation()
          //  e.target.reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err.message,
        });
      });
  }

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <form
            className="form-sample"
            onSubmit={handleSubmit(onSubmitDatasupportcreate)}
          >
            {/* <div className="row"><b className="card-description">Data Support</b></div> */}
            <div class="form-row">
              <div className="form-group col-md-6">
                <label for="noofcommunity">
                  No Of Communities&nbsp;<span style={{ color: "red" }}>*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="noofcommunity"
                  placeholder="No Of Communities"
                  {...register("noofcommunity", {
                    required: true,
                    pattern: { value: /^[0-9\b]+$/ },
                  })}
                  aria-invalid={errors?.noofcommunity ? "true" : "false"}
                  disabled={!isEditable}
                />
                {errors?.noofcommunity?.type === "required" && (
                  <div className="text-danger text_error">
                    No Of Communities is required
                  </div>
                )}
                {errors?.noofcommunity?.type === "pattern" && (
                  <div className="text-danger text_error ">
                    Numbers only allowed
                  </div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label for="noofinstitution">
                  No Of Institution&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="noofinstitution"
                  placeholder="No Of Institution"
                  {...register("noofinstitution", {
                    required: true,
                    pattern: { value: /^[0-9\b]+$/ },
                  })}
                  aria-invalid={errors?.noofinstitution ? "true" : "false"}
                  disabled={!isEditable}
                />
                {errors?.noofinstitution?.type === "required" && (
                  <div className="text-danger text_error">
                    No Of Institution is required
                  </div>
                )}
                {errors?.noofinstitution?.type === "pattern" && (
                  <div className="text-danger text_error ">
                    Numbers only allowed
                  </div>
                )}
              </div>
            </div>

            <div class="form-row">
              <div className="form-group col-md-6">
                <label for="noofmembers">
                  No Of Members&nbsp;<span style={{ color: "red" }}>*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="noofmembers"
                  placeholder="No Of Members"
                  {...register("noofmembers", {
                    required: true,
                    pattern: { value: /^[0-9\b]+$/ },
                  })}
                  aria-invalid={errors?.noofmembers ? "true" : "false"}
                  disabled={!isEditable}
                />
                {errors?.noofmembers?.type === "required" && (
                  <div className="text-danger text_error">
                    No Of Members is required
                  </div>
                )}
                {errors?.noofmembers?.type === "pattern" && (
                  <div className="text-danger text_error ">
                    Numbers only allowed
                  </div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label for="exampleInputPassword">
                  No Of Records&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="dataentry"
                  placeholder="No Of Records"
                  {...register("dataentry", {
                    required: true,
                    pattern: { value: /^[0-9\b]+$/ },
                  })}
                  aria-invalid={errors?.dataentry ? "true" : "false"}
                  disabled={!isEditable}
                />
                {errors?.dataentry?.type === "required" && (
                  <div className="text-danger text_error">
                    No Of Records is required
                  </div>
                )}
                {errors?.dataentry?.type === "pattern" && (
                  <div className="text-danger text_error ">
                    Numbers only allowed
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              {isLogedIn?.role == "admin" ? (
                <button
                  type="submit"
                  class="btn btn-gradient-light"
                  onClick={toggleEditability}
                  value="Submit"
                >
                  {isEditable ? "Save" : "Edit"}
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Datasupportcreate;
