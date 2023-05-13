import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function ClientRegistrationViews() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const country = require("country-state-city").Country;
  const value = country.getAllCountries();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Registeredit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
        const value = resp.data[0].country;
        const State = require("country-state-city").State;
        var getValue = State.getStatesOfCountry(value);
        data(getValue);
        const fileDatas = resp.data[0].fileattachment;
        fileData(fileDatas);
        $(".updatebut").hide();
        $(".regdata").prop("disabled", true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [file, fileData] = useState();
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

  const navigate = useNavigate();

  function countrySelect(event) {
    var value = event.target.value;
    const State = require("country-state-city").State;
    var getValue = State.getStatesOfCountry(value);
    data(getValue);
  }
  const [selectState, data] = useState([]);
  function CongregationSelect(event) {
    var id = event.target.value;
    axios
      .get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        SetProvince(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    $(".filelabel").hide();
  };
  const [selectedFile, setSelectedFile] = useState();

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-multiple-plus menu-icon" />
          </span>{" "}
          View Client Details
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample" onSubmit={handleSubmit()}>
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="Congregation">
                      Congregation &nbsp;
                    </label>
                    <select
                      className="form-control regdata"
                      name="congregation"
                      {...register("congregation", {
                        required: true,
                        onChange: CongregationSelect,
                      })}
                      aria-invalid={errors?.congregation ? "true" : "false"}>
                      <option value="">Select Congregation</option>
                      {congre &&
                        congre.map((item) => (
                          <option value={item.id}>{item.congregation}</option>
                        ))}
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
                    <label for="province">
                      Province &nbsp;
                    </label>
                    <select
                      className="form-control regdata"
                      name="province"
                      {...register("province", { required: true })}
                      aria-invalid={errors?.province ? "true" : "false"}>
                      <option value="">Select Province</option>
                      {Pro &&
                        Pro.map((item) => (
                          <option value={item.id}>{item.province}</option>
                        ))}
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
                <div className="form-group">
                  <label>
                    Name&nbsp;
                  </label>
                  <input
                    type="text"
                    className="form-control regdata"
                    name="name"
                    {...register("name", { required: true })}
                    aria-invalid={errors?.name ? "true" : "false"}
                  />
                  {errors?.name?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">Name is required</label>
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Client Type&nbsp;
                    </label>
                    <select
                      className="form-control regdata"
                      name="clienttype"
                      {...register("clienttype", { required: true })}
                      aria-invalid={errors?.clienttype ? "true" : "false"}>
                      <option value="">Select Client Type</option>
                      <option value="Priest">Priest</option>
                      <option value="Sisters">Sisters</option>
                      <option value="LayBrothers">Lay Brothers</option>
                    </select>
                    {errors?.clienttype?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select clientType
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Client Code&nbsp;
                    </label>
                    <input
                      type="text"
                      className="form-control regdata"
                      name="clientcode"
                      {...register("clientcode", {
                        required: true,
                        pattern: /^[0-9a-zA-Z]+$/,
                      })}
                      aria-invalid={errors?.clientcode ? "true" : "false"}
                    />
                    {errors?.clientcode?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Client Code is required
                        </label>
                      </div>
                    )}
                    {errors?.clientcode?.type === "pattern" && (
                      <div className="text-danger text_error ">
                        <label className="errlabel">
                          Client Code contain only Numbers & Alphabets
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Place&nbsp;
                  </label>
                  <input
                    type="text"
                    className="form-control regdata"
                    name="place"
                    {...register("place", { required: true })}
                    aria-invalid={errors?.place ? "true" : "false"}
                  />
                  {errors?.place?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">Place is required</label>
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Financial Year&nbsp;
                      
                    </label>
                    <input
                      type="text"
                      className="form-control regdata"
                      placeholder="YYYY-YYYY"
                      name="financialyear"
                      {...register("financialyear", {
                        required: true,
                        pattern: /^\d{4}-\d{4}$/,
                      })}
                      aria-invalid={errors?.financialyear ? "true" : "false"}
                    />
                    {errors?.financialyear?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">Place is required</label>
                      </div>
                    )}
                    {errors?.financialyear?.type === "pattern" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please enter following format YYYY-YYYY{" "}
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Date of Joining&nbsp;
                      
                    </label>
                    <input
                      type="Date"
                      className="form-control regdata"
                      name="dateofjoining"
                      {...register("dateofjoining", { required: true })}
                      aria-invalid={errors?.dateofjoining ? "true" : "false"}
                    />
                    {errors?.dateofjoining?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Date of Joining is required
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Project Value&nbsp;
                  </label>
                  <input
                    type="text"
                    className="form-control regdata"
                    name="projectvalue"
                    {...register("projectvalue", {
                      required: true,
                      pattern: { value: /^[0-9\b]+$/ },
                    })}
                    aria-invalid={errors?.projectvalue ? "true" : "false"}
                  />
                  {errors?.projectvalue?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">
                        Project Value is required
                      </label>
                    </div>
                  )}
                  {errors?.projectvalue?.type === "pattern" && (
                    <div className="text-danger text_error ">
                      <label className="errlabel">
                        Project Value can contain only Numbers
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Contract Signed Date&nbsp;
                      
                    </label>
                    <input
                      type="Date"
                      className="form-control regdata"
                      name="dateofcontractsigning"
                      {...register("dateofcontractsigning", { required: true })}
                      aria-invalid={
                        errors?.dateofcontractsigning ? "true" : "false"
                      }
                    />
                    {errors?.dateofcontractsigning?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Date of Contract Signing is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      AMC Start Date&nbsp;
                      
                    </label>
                    <input
                      type="Date"
                      className="form-control regdata"
                      name="amcdate"
                      {...register("amcdate", { required: true })}
                      aria-invalid={errors?.amcdate ? "true" : "false"}
                    />
                    {errors?.amcdate?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">AMC Date is required</label>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" form-group">
                  <label>
                    AMC value&nbsp;
                  </label>
                  <input
                    type="text"
                    className="form-control regdata"
                    name="amcvalue"
                    {...register("amcvalue", {
                      required: true,
                      pattern: { value: /^[0-9\b]+$/ },
                    })}
                    aria-invalid={errors?.amcvalue ? "true" : "false"}
                  />
                  {errors?.amcvalue?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">AMC value is required</label>
                    </div>
                  )}
                  {errors?.amcvalue?.type === "pattern" && (
                    <div className="text-danger text_error ">
                      <label className="errlabel">
                        AMC value can contain only Numbers
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Project Status&nbsp;
                      
                    </label>
                    <select
                      className="form-control regdata"
                      name="projectstatus"
                      {...register("projectstatus", { required: true })}
                      aria-invalid={errors?.projectstatus ? "true" : "false"}>
                      <option value="">Select Project Status</option>
                      <option value="Completed">Completed</option>
                      <option value="InProgress">InProgress</option>
                      <option value="Notstrated">Not Started</option>
                    </select>
                    {errors?.projectstatus?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select clientType
                        </label>
                      </div>
                    )}
                  </div>
                  <div className=" form-group col-md-6">
                    <label>
                      File Attachment&nbsp;
                      
                    </label>
                    <input
                      type="File"
                      className="form-control regdata"
                      name="fileattachment"
                      {...register("fileattachment", {
                        onChange: changeHandler,
                      })}
                    />
                    <div className="Getfile filelabel">
                      <label className="errlabel">{file}</label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label className="form-group">Solutions :</label>
                  </div>
                  <div className="form-group col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="form-check-input regdata"
                        name="webapplication"
                        {...register("webapplication")}
                      />{" "}
                      Web Application <i className="input-helper" />
                    </label>
                  </div>
                  <div className="form-group col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="form-check-input regdata"
                        name="app"
                        {...register("app")}
                      />{" "}
                      Mobile Application <i className="input-helper" />
                    </label>
                  </div>
                  <div className="form-group col-md-3">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input regdata"
                        name="website"
                        {...register("website")}
                      />{" "}
                      Website <i className="input-helper" />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <b className="card-description"> Address </b>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address 1&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control regdata"
                          name="address1"
                          {...register("address1", { required: true })}
                          aria-invalid={errors?.address1 ? "true" : "false"}
                        />
                        {errors?.address1?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Address 1 is required
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address 2
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control regdata"
                          name="address2"
                          {...register("address2")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        City&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control regdata"
                          name="city"
                          {...register("city", { required: true })}
                          aria-invalid={errors?.city ? "true" : "false"}
                        />
                        {errors?.city?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">City is required</label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Country&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryvalue regdata"
                          name="country"
                          {...register("country", {
                            required: true,
                            onChange: countrySelect,
                          })}
                          aria-invalid={errors?.country ? "true" : "false"}>
                          <option value="">Select Country</option>
                          {value &&
                            value.map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        {errors?.country?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select Country
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        State&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryindia regdata"
                          name="state"
                          {...register("state", { required: true })}
                          aria-invalid={errors?.state ? "true" : "false"}>
                          <option value="">Select State</option>
                          {selectState &&
                            selectState.map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        {errors?.state?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select State
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Pin code&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control regdata"
                          name="postcode"
                          {...register("postcode", {
                            required: true,
                            pattern: { value: /^[0-9\b]+$/ },
                          })}
                          aria-invalid={errors?.postcode ? "true" : "false"}
                        />
                        {errors?.postcode?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Postcode is required
                            </label>
                          </div>
                        )}
                        {errors?.postcode?.type === "pattern" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Postcode can contain only Numbers
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Email&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control regdata"
                          name="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          aria-invalid={errors?.email ? "true" : "false"}
                        />
                        {errors?.email?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Email is required
                            </label>
                          </div>
                        )}
                        {errors?.email?.type === "pattern" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Invalid email address
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Mobile No&nbsp;
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control regdata"
                          name="mobile"
                          {...register("mobile", {
                            required: true,
                            minLength: 10,
                            maxLength: 12,
                            pattern: /^[]?\d*(?:[.,]\d*)?$/,
                          })}
                          aria-invalid={errors?.mobile ? "true" : "false"}
                        />
                        {errors?.mobile?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Mobile Number is required
                            </label>
                          </div>
                        )}
                        {errors?.mobile?.type === "minLength" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number shoul be minimum Numbers 10
                            </label>
                          </div>
                        )}
                        {errors?.mobile?.type === "maxLength" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number shoul be maximum Numbers12
                            </label>
                          </div>
                        )}
                        {errors?.mobile?.type === "pattern" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number can contain only Numbers
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    to="/Religio/ClientRegistration"
                    class="btn btn-gradient-primary font-weight-bold ">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientRegistrationViews;
