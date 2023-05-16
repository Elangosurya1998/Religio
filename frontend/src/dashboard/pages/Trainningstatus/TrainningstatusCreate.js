import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../includes/Navbar";
import { Rating } from "react-simple-star-rating";

function Trainningstatuscreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  // checkbox form

  const { id } = useParams();

  const [file, filedatass] = useState();
  const onlinestatus = () => {
    fetch(`${ApiUrl}/onlinetatusedit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
        setRating(resp.data[0].onlinerating);
        filedatass(resp.data[0].online);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [rating, setRating] = useState(0); // initial rating value
  // Catch Rating value
  const [state, setState] = useState("onsite");
  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };

  function onSubmtionlinecreate(data, e) {
    if (isEditable) return;
    data["onlinerating"] = rating;

    axios
      .put(`${ApiUrl}/onlinestatusupdate/${id}`, data)
      .then((response) => {
        axios
          .post(`${ApiUrl}/onlineuploadid/${id}`, datass)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        if (response.status === 200) {
          Swal.fire(
            "Updated Successfully..!",
            "Online Data Updated ..",
            "success"
          );
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

    const datass = new FormData();
    datass.append("online", selectedFiles);
  }
  const changeHandler = (event) => {
    setSelectedFiles(event.target.files[0]);
  };
  const [selectedFiles, setSelectedFiles] = useState();
  console.log(selectedFiles);

  const [isEditable, setIsEditable] = useState(false);
  const toggleEditability = () => {
    isEditable && handleSubmit(onSubmtionlinecreate);
    setIsEditable(!isEditable);
  };

  //  onsite

  function onSubmitonsitecreate(datas, e) {
    if (isEditables) return;
    datas["onsiterating"] = ratings;
    axios
      .put(`${ApiUrl}/onsitestatusupdate/${id}`, datas)
      .then((response) => {
        axios
          .post(`${ApiUrl}/onsiteuploadid/${id}`, formData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        if (response.status === 200) {
          Swal.fire(
            "Updated Successfully..!",
            "Onsite Data Updated ..",
            "success"
          );
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

    const formData = new FormData();
    formData.append("onsite", selectedFile);
  }
  const changeHandlers = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [selectedFile, setSelectedFile] = useState();
  console.log(selectedFile);

  const [files, filedatas] = useState();

  const onsitestatusget = () => {
    fetch(`${ApiUrl}/onsitestatusedit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
        setRatings(resp.data[0].onsiterating);
        filedatas(resp.data[0].onsite);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    onsitestatusget();
    onlinestatus();
  }, []);

  const [ratings, setRatings] = useState(0);

  const handleRatingss = (ratess) => {
    setRatings(ratess);
    // Some logic
  };

  const [isEditables, setIsEditables] = useState(false);
  const toggleEditabilities = () => {
    isEditable && handleSubmit(onSubmitonsitecreate);
    setIsEditables(!isEditables);
  };
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="form-row">
            <div className="form-group col-md-6">
              {/* <h2 className="card-title">Trainning Status</h2> */}
              <div class="row">
                <div className="form-group col-md-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={state === "online"}
                    onChange={() => {
                      setState("online");
                      onlinestatus();
                    }}
                  />
                  <p>Online</p>
                </div>
                <div className="form-group col-md-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={state === "onsite"}
                    onChange={(checked) => {
                      setState("onsite");
                      onsitestatusget();
                    }}
                  />
                  <p>Onsite</p>
                </div>
              </div>
            </div>
          </div>
          {state === "online" ? (
            <form
              className="form-sample"
              onSubmit={handleSubmit(onSubmtionlinecreate)}
            >
              <div className="row">
                <b className="card-description"> Online Stataus </b>
              </div>

              <div className="form-group">
                <div className="form-group col-md-6">
                  <label for="produsername">
                    Meeting &nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="form-group col-md-6">
                    <p>
                      <label>
                        <input
                          type="radio"
                          className="form-check-input"
                          name="onlinemeeting"
                          value="Google meet"
                          {...register("onlinemeeting")}
                          disabled={!isEditable}
                        />
                        Google meet
                      </label>
                    </p>
                    <p>
                      <label>
                        <input
                          type="radio"
                          className="form-check-input"
                          name="onlinemeeting"
                          value="Zoom"
                          {...register("onlinemeeting")}
                          disabled={!isEditable}
                        />
                        Zoom
                      </label>
                    </p>
                    <p>
                      <label>
                        <input
                          type="radio"
                          className="form-check-input"
                          name="onlinemeeting"
                          value="Skype"
                          {...register("onlinemeeting")}
                          disabled={!isEditable}
                        />
                        Skype
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className=" form-group col-md-6">
                  <label>
                    {" "}
                    Date&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="YYYY"
                    name="onlinedate"
                    {...register("onlinedate", { required: true })}
                    aria-invalid={errors?.onlinedate ? "true" : "false"}
                    disabled={!isEditable}
                  />
                  {errors?.onlinedate?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">
                        Target Date is required
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label for="exampleInputUsername">
                    Number of hours&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="onlinehours"
                    placeholder="Number of hours"
                    {...register("onlinehours", { required: true })}
                    aria-invalid={errors?.onlinehours ? "true" : "false"}
                    disabled={!isEditable}
                  />
                  {errors?.onlinehours?.type === "required" && (
                    <div className="text-danger text_error">
                      Number of hours is required
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="exampleInputUsername">Rating</label>
                  <div className="form-group col-md-12">
                    <Rating
                      type="text"
                      onClick={handleRating}
                      initialValue={rating}
                      size={20}
                      readonly={!isEditable}
                      label
                      transition
                      fillColor="orange"
                      emptyColor="gray"
                    />
                  </div>
                </div>
                <div className=" form-group col-md-6">
                  <label>
                    File Attachment&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="File"
                    accept=".pdf, .docx, .pptx, .doc"
                    className="form-control"
                    name="FileAttachment"
                    {...register("FileAttachment", { onChange: changeHandler })}
                    aria-invalid={errors?.FileAttachment ? "true" : "false"}
                    disabled={!isEditable}
                  />
                  {errors?.FileAttachment?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">Choose a File</label>
                    </div>
                  )}
                  <div className="">
                    <label>{file}</label>
                  </div>
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
          ) : (
            <form
              className="form-sample"
              onSubmit={handleSubmit(onSubmitonsitecreate)}
            >
              <div className="row">
                <b className="card-description"> Onsite Stataus </b>
              </div>

              <div className="form-row">
                <div className=" form-group col-md-6">
                  <label>
                    {" "}
                    Date&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="YYYY"
                    name="onsitedate"
                    {...register("onsitedate", { required: true })}
                    aria-invalid={errors?.onsitedate ? "true" : "false"}
                    disabled={!isEditables}
                  />
                  {errors?.onsitedate?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">
                        Target Date is required
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label for="exampleInputUsername">
                    Number of days&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="onsitedays"
                    placeholder="Number of days"
                    {...register("onsitedays", { required: true })}
                    aria-invalid={errors?.onsitedays ? "true" : "false"}
                    disabled={!isEditables}
                  />
                  {errors?.onsitedays?.type === "required" && (
                    <div className="text-danger text_error">
                      Number of days is required
                    </div>
                  )}
                </div>
              </div>

              <div class="form-row">
                <div className="form-group col-md-6">
                  <label for="exampleInputUsername">
                    Place&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="textusername"
                    placeholder="Place"
                    {...register("onsiteplace", {
                      required: true,
                      pattern: { value: /^[A-Za-z ]+$/ },
                    })}
                    aria-invalid={errors?.onsiteplace ? "true" : "false"}
                    disabled={!isEditables}
                  />
                  {errors?.onsiteplace?.type === "required" && (
                    <div className="text-danger text_error">
                      Onsiteplace is required
                    </div>
                  )}
                  {errors?.onsiteplace?.type === "pattern" && (
                    <div className="text-danger text_error ">
                      Onsiteplace can contain only alphabets
                    </div>
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label for="exampleInputPassword">
                    Training Expansive&nbsp;
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="expensive"
                    placeholder="Training Expansive"
                    {...register("expensive", { required: true })}
                    aria-invalid={errors?.expensive ? "true" : "false"}
                    disabled={!isEditables}
                  />
                  {errors?.expensive?.type === "required" && (
                    <div className="text-danger text_error">
                      Training Expansive is required
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="exampleInputUsername">Rating</label>
                  <div className="form-group col-md-12">
                    <Rating
                      type="text"
                      onClick={handleRatingss}
                      initialValue={ratings}
                      size={20}
                      readonly={!isEditables}
                      label
                      transition
                      fillColor="orange"
                      emptyColor="gray"
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    File Attachment&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="File"
                    accept=".pdf, .docx, .pptx, .doc"
                    className="form-control"
                    name="onsite"
                    {...register("onsite", { onChange: changeHandlers })}
                    aria-invalid={errors?.onsite ? "true" : "false"}
                    disabled={!isEditables}
                  />
                  {errors?.onsite?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">Choose a File</label>
                    </div>
                  )}
                  <div className="">
                    <label>{files}</label>
                  </div>
                </div>
              </div>

              <div className="text-center">
              {isLogedIn?.role == "admin" ? (
                <button
                  type="submit"
                  class="btn btn-gradient-light"
                  onClick={toggleEditabilities}
                  value="Submit"
                >
                  {isEditable ? "Save" : "Edit"}
                </button>
              ) : (
                ""
              )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Trainningstatuscreate;
