import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function OurclientView() {

  $(".regdata").prop("disabled", true);

  const { id } = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurCustomerSay/View/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        reset(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Province/Congregation`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        Congregation(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [congre, Congregation] = useState([]);

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Province`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        SetProvince(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [Pro, SetProvince] = useState([]);

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Clientregistration`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        SetClient(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [Client, SetClient] = useState([]);

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-multiple-plus menu-icon" />
          </span> Our Customers Says
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample" encType="multipart/form-data" >
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <select className="form-control regdata" name="congregation" {...register("congregation", { required: true })}>
                      <option value="">Select Congregation</option>
                      {
                        congre && congre.map(item => (
                          <option value={item.id}>{item.congregation}</option>
                        ))
                      }
                    </select>
                    {errors?.congregation?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select Congregation
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Province &nbsp;<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className="form-control regdata" name="province" {...register("province", { required: true })} >
                      <option value="">Select Province</option>
                      {
                        Pro && Pro.map(item => (
                          <option value={item.id}>{item.province}</option>
                        ))
                      }
                    </select>
                    {errors?.province?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select Province
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Clients &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <select className="form-control regdata" name="client" {...register("client", { required: true })} >
                      <option value="">Select Client</option>
                      {
                        Client && Client.map(item => (
                          <option value={item.id}>{item.name}</option>
                        ))
                      }
                    </select>
                    {errors?.client?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select Client
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Title &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control regdata" name="title" {...register("title", { required: true })} />
                    {errors?.title?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please enter a title
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Comments &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <textarea className="form-control regdata" name="comments" rows="5" {...register("comments", { required: true })}></textarea>
                    {errors?.comments?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please enter your comments
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/Religio/HomeSections/OurCustomerSay" className="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
export default OurclientView;
