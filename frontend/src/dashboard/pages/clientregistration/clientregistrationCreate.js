import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ClientRegistrationCreate() {
  $("#uniqueclientcode").hide();
  $("#uniquefile").hide();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectDate, setSelectDate] = useState(null);
  const [selectedContractDate, setSelectedContractDate] = useState(null);
  const [selectContractDate, setselectContractDate] = useState(null);
  const [selectedAMCDate, setSelectedAMCDate] = useState(null);
  const [selectAMCDate, setselectAMCDate] = useState(null);
  const [error, setError] = useState({});
  const country = require("country-state-city").Country;
  const value = country.getAllCountries();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
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

  function onSubmitformregister(data, e) {
    const formData = new FormData();

    formData.append("File", selectedFile);
    if (selectedDate === null) {
      setError((pre) => ({
        ...pre,
        selectedDate: "Date of Joining is required",
      }));
      return false;
    } else {
      setError((pre) => ({ ...pre, selectedDate: "" }));
    }
    if (selectedContractDate === null) {
      setError((pre) => ({
        ...pre,
        selectedDate1: "Date of Contract Signing is required",
      }));
      return false;
    } else {
      setError((pre) => ({ ...pre, selectedDate1: "" }));
    }
    if (selectedAMCDate === null) {
      setError((pre) => ({
        ...pre,
        selectedDate2: "AMC Date is required",
      }));
      return false;
    } else {
      setError((pre) => ({ ...pre, selectedDate2: "" }));
    }
    data.dateofjoining = selectedDate;
    data.dateofcontractsigning = selectedContractDate;
    data.amcdate = selectedAMCDate;

    axios
      .post(`${ApiUrl}/Religio/Clientregistration/store`, data)
      .then((response) => {
        axios
          .post(`${ApiUrl}/Religio/Clientregistration/uploadfile`, formData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        if (response.status === 200) {
          Swal.fire("Registrated Successfully..!", "", "success");
          navigate("/Religio/ClientRegistration");
          e.target.reset();
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
  function countrySelect(event) {
    var value = event.target.value;
    const State = require("country-state-city").State;
    var getValue = State.getStatesOfCountry(value);
    data(getValue);
  }
  const [selectState, data] = useState([]);

  function CongregationSelect(event) {
    var id = event.target.value;
    $(".myprovince").val("");
    $(".proadd").val("");
    axios
      .get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        SetProvince(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [Pro, SetProvince] = useState([]);

  function ProvinceSelect(event) {
    var id = event.target.value;
    $(".proadd").val("");
    axios
      .get(`${ApiUrl}/Religio/ProvinceAddress/get/${id}`)
      .then((response) => {
        const resdata = response.data;
        reset(resdata.data[0]);
        const value = resdata.data[0].country;
        const State = require("country-state-city").State;
        var getValue = State.getStatesOfCountry(value);
        data(getValue);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changeHandler = (event) => {
    var filePath = event.target.value;
    var allowedExtensions = /(\.pdf|\.docx|\.pptx|\.doc)$/i;

    if (!allowedExtensions.exec(filePath)) {
      $("#uniquefile").show();
    } else {
      $("#uniquefile").hide();
      setSelectedFile(event.target.files[0]);
    }
  };

  const [selectedFile, setSelectedFile] = useState();

  const uniquClient = (event) => {
    const data = event.target.value;
    axios
      .get(`${ApiUrl}/Religio/CheckUniquecode/get/${data}`)
      .then((response) => {
        const resdata = response.data;
        console.log(resdata.success);
        if (resdata.success === true) {
          $("#uniqueclientcode").show();
        } else {
          $("#uniqueclientcode").hide();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDateChange = (date) => {
    const month = date.getMonth().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const dates = date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const datedata = `${date.getFullYear()}-${month}-${dates}`;

    setSelectDate(date);

    setSelectedDate(datedata);
  };

  const handleDateContract = (date) => {
    const month = date.getMonth().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const dates = date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const datedata = `${date.getFullYear()}-${month}-${dates}`;

    setselectContractDate(date);

    setSelectedContractDate(datedata);
  };

  const handleDateAMC = (date) => {
    const month = date.getMonth().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const dates = date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const datedata = `${date.getFullYear()}-${month}-${dates}`;

    setselectAMCDate(date);

    setSelectedAMCDate(datedata);
  };
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-multiple-plus menu-icon" />
          </span>{" "}
          Client Registration
        </h3>
        {/* <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
              </li>
            </ul>
          </nav> */}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* <h4 className="card-title"> Client Registration</h4> */}
              <form
                className="form-sample"
                onSubmit={handleSubmit(onSubmitformregister)}>
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="Congregation">
                      Congregation &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
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
                      Province &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control myprovince"
                      name="province"
                      {...register("province", {
                        required: true,
                        onChange: ProvinceSelect,
                      })}
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
                    Name&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                      Client Type&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="clienttype"
                      {...register("clienttype", { required: true })}
                      aria-invalid={errors?.clienttype ? "true" : "false"}>
                      <option value="">Select Client Type</option>
                      <option value="Priest">Priest</option>
                      <option value="Sisters">Sisters</option>
                      <option value="LayBrothers">Brothers</option>
                    </select>
                    {errors?.clienttype?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select clienttype
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label>
                      Client Code&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="clientcode"
                      {...register("clientcode", {
                        required: true,
                        onChange: uniquClient,
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
                    <div className="clientcode filelabel" id="uniqueclientcode">
                      <label className="errlabel text-danger text_error">
                        Client Code already taken..
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Place&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                        <label className="errlabel">
                          Financial Year is required
                        </label>
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
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      name="dateofjoining"
                      {...register("dateofjoining")}
                      className="form-control"
                      selected={selectDate}
                      autoComplete="off"
                      onChange={handleDateChange}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={25}
                      dateFormat="dd-MM-yyyy"
                    />
                    {error?.selectedDate != "" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          {error?.selectedDate}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Project Value&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <DatePicker
                      name="dateofcontractsigning"
                      {...register("dateofcontractsigning")}
                      className="form-control"
                      selected={selectContractDate}
                      autoComplete="off"
                      onChange={handleDateContract}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={25}
                      dateFormat="dd-MM-yyyy"
                    />
                    {errors?.dateofcontractsigning?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Date of Contract Signing is required
                        </label>
                      </div>
                    )}
                    <div className="text-danger text_error">
                      <label className="errlabel">{error?.selectedDate1}</label>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      AMC Start Date&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    {/* <input
                      type="Date"
                      className="form-control"
                      name="amcdate"
                      {...register("amcdate", { required: true })}
                      aria-invalid={errors?.amcdate ? "true" : "false"}
                    /> */}
                    <DatePicker
                      name="amcdate"
                      {...register("amcdate")}
                      className="form-control"
                      selected={selectAMCDate}
                      autoComplete="off"
                      onChange={handleDateAMC}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={25}
                      dateFormat="dd-MM-yyyy"
                    />

                    {errors?.amcdate?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">AMC Date is required</label>
                      </div>
                    )}
                    <div className="text-danger text_error">
                      <label className="errlabel">{error?.selectedDate2}</label>
                    </div>
                  </div>
                </div>

                <div className=" form-group">
                  <label>
                    AMC value&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="projectstatus"
                      {...register("projectstatus", { required: true })}
                      aria-invalid={errors?.projectstatus ? "true" : "false"}>
                      <option>Select Project Status</option>
                      <option value="Completed">Completed</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Notstrated">Not Started</option>
                    </select>
                    {errors?.projectstatus?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Select Project Status
                        </label>
                      </div>
                    )}
                  </div>
                  <div className=" form-group col-md-6">
                    <label>
                      File Attachment&nbsp; &nbsp; ( Supported format is pdf
                      ,pptx, docx ,doc )
                    </label>
                    <input
                      type="File"
                      className="form-control"
                      name="fileattachment"
                      {...register("fileattachment", {
                        onChange: changeHandler,
                      })}
                      aria-invalid={errors?.fileattachment ? "true" : "false"}
                    />
                    <div className="clientcode filelabel" id="uniquefile">
                      <label className="errlabel text-danger text_error">
                        The file must be a file of type: pdf ,pptx, docx ,doc
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label className="form-group">Solutions </label>
                  </div>
                  <div className="form-group col-md-3">
                    <div className="form-check form-check-flat form-check-primary">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="webapplication"
                          {...register("webapplication")}
                        />{" "}
                        Web Application <i className="input-helper" />
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div className="form-check form-check-flat form-check-primary">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="app"
                          {...register("app")}
                        />{" "}
                        Mobile Application <i className="input-helper" />
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <div className="form-check form-check-flat form-check-primary">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="website"
                          {...register("website")}
                        />{" "}
                        Website <i className="input-helper" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <b className="card-description"> Address </b>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address1&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control proadd"
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
                          className="form-control proadd"
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
                        City&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control proadd"
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
                        Country&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryvalue proadd"
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
                        State&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryindia proadd"
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
                        Pin code&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control proadd"
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
                        Email&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control proadd"
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
                        Mobile No&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control proadd"
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
                  <button
                    class="btn btn-gradient-primary font-weight-bold "
                    type="submit">
                    Register
                  </button>
                  &nbsp; &nbsp; &nbsp;
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

export default ClientRegistrationCreate;
