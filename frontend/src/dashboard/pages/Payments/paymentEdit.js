import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import AppUrl from "../Api/Url";

function PaymentEdit() {
  $("#uniquefile").hide();
  $("#uniquefilereceipt").hide();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { id } = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Paymentedit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
        console.log(resp.data[0]);
        const event = resp.data[0].clienttype;
        const proevent = resp.data[0].projectvalue;
        const fileinvoice = resp.data[0].invoice;
        const filereceipt = resp.data[0].receipt;

        const paidbalvalue = resp.data[0].balancepaid;
        const amcvalue = resp.data[0].amcvalue;

        setSelectedValue(event);
        setOrgvalue(proevent);
        invoivefile(fileinvoice);
        receiptedFile(filereceipt);
        setPaidbalvalue(paidbalvalue);
        setAmcvalue(amcvalue);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
  const [infile, invoivefile] = useState();
  const [resfile, receiptedFile] = useState();

  function onSubmitformregister(data, e) {
    const formData = new FormData();

    formData.append("File", selectedFile);
    formData.append("FileRes", receiptFile);
    data["balance"] = balanceAmount;
    data["gst"] = GSTAmount;
    // data['status'] = paymentStatus;
    data["total"] = totalAmount;
    data["balancepaid"] = balpaid;

    axios
      .put(`${ApiUrl}/Religio/Payment/update/${id}`, data)
      .then((response) => {
        axios
          .post(`${ApiUrl}/Religio/Paymentupdate/uploadfile/${id}`, formData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        if (response.status === 200) {
          Swal.fire(
            "Updated Successfully..!",
            "Payment Status Updated ..",
            "success"
          );
          navigate("/Religio/PaymentStatus");
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

  function CongregationSelect(event) {
    var id = event.target.value;
    console.log(id);
    axios
      .get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        SetProvince(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  // Hide/Show Fields Based on Client Type
  const [selectedValue, setSelectedValue] = useState("");
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Auto Calculate Balance
  const [provalue, setProvalue] = useState("");
  const [paidvalue, setPaidvalue] = useState("");
  const [amcvalue, setAmcvalue] = useState("");
  const [orgvalue, setOrgvalue] = useState("");

  const [paidbalvalue, setPaidbalvalue] = useState("");

  const projectvalueChange = (event, e) => {
    setProvalue(event.target.value);
    setOrgvalue(event.target.value);
  };

  const paidvalueChange = (event) => {
    setPaidvalue(event.target.value);
  };

  const amcvalueChange = (event) => {
    setAmcvalue(event.target.value);
    setOrgvalue(event.target.value);
  };

  const paidBalanceChange = (event) => {
    setPaidbalvalue(event.target.value);
  };

  // GST Calculation

  const originalAmount = orgvalue;

  const GSTPercentage = 18;

  const GSTAmount = (originalAmount * GSTPercentage) / 100;

  const totalAmount = Number(originalAmount) + Number(GSTAmount);

  const balanceAmount =
    paidbalvalue === ""
      ? totalAmount - paidvalue
      : totalAmount - paidvalue - paidbalvalue;

  const balpaid = paidbalvalue;

  //const paymentStatus = balanceAmount !== 0 ? "Pending" : "Completed";

  const now = new Date();
  const currentYear = now.getFullYear();

  const changeHandler = (event) => {
    $(".filelabel").hide();
    var filePath = event.target.value;
    var allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.exec(filePath)) {
      $("#uniquefile").show();
    } else {
      $("#uniquefile").hide();
      setSelectedFile(event.target.files[0]);
    }
  };
  const [selectedFile, setSelectedFile] = useState();

  const changeHandlerreceipt = (event) => {
    $(".resfilelabel").hide();
    var filePath = event.target.value;
    var allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.exec(filePath)) {
      $("#uniquefilereceipt").show();
    } else {
      $("#uniquefilereceipt").hide();
      setFilereceipt(event.target.files[0]);
    }
  };
  const [receiptFile, setFilereceipt] = useState();

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-cash-multiple menu-icon" />
          </span>{" "}
          Update Payment Details
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                className="form-sample"
                onSubmit={handleSubmit(onSubmitformregister)}>
                <br></br>
                <div className="form-group">
                  <label>
                    Client Type &nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-control"
                    id="clienttype"
                    value={selectedValue}
                    name="clienttype"
                    {...register("clienttype", {
                      required: true,
                      onChange: handleDropdownChange,
                    })}
                    aria-invalid={errors?.clienttype ? "true" : "false"}>
                    <option value="">Select Client</option>
                    <option value="NewSales">New Sales</option>
                    <option value="AMC">AMC</option>
                    <option value="Outstanding">Outstanding</option>
                  </select>
                  {errors?.clienttype?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">
                        Please select Client Type
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
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
                          Please Choose One Congregation
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label>
                      Province &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
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
                          Please Choose One Province
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Product &nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-control"
                    id="product"
                    name="product"
                    {...register("product", { required: true })}
                    aria-invalid={errors?.product ? "true" : "false"}>
                    <option value="">Select Product</option>
                    <option value="RELIGIO">RELIGIO</option>
                    <option value="AVOSA">AVOSA</option>
                  </select>
                  {errors?.product?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">
                        Please Choose One Product
                      </label>
                    </div>
                  )}
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
                      Client Code&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                <div className="form-row">
                  <div className=" form-group col-md-6">
                    <label>
                      Invoice&nbsp; &nbsp; ( Supported format is pdf )
                    </label>
                    <input
                      type="File"
                      className="form-control"
                      name="invoice"
                      {...register("invoice", {
                        onChange: changeHandler,
                      })}
                      aria-invalid={errors?.invoice ? "true" : "false"}
                    />
                    <div className="Getfile filelabel">
                      <label>
                        <Link
                          style={{ color: "#222324", paddingTop: 10 }}
                          to={AppUrl + "/Invoice/" + infile}
                          target="_blank"
                          download>
                          {infile}
                        </Link>
                      </label>
                    </div>
                    <div className="clientcode filelabel" id="uniquefile">
                      <label className="errlabel text-danger text_error">
                        The file must be a file of type: pdf
                      </label>
                    </div>
                  </div>
                  <div className=" form-group col-md-6">
                    <label>
                      Receipt&nbsp; &nbsp; ( Supported format is pdf )
                    </label>
                    <input
                      type="File"
                      className="form-control"
                      name="receipt"
                      {...register("receipt", {
                        onChange: changeHandlerreceipt,
                      })}
                      aria-invalid={errors?.receipt ? "true" : "false"}
                    />
                    <div className="Getfile resfilelabel">
                      <label>
                        <Link
                          style={{ color: "#222324", paddingTop: 10 }}
                          to={AppUrl + "/Receipt/" + resfile}
                          target="_blank"
                          download>
                          {resfile}
                        </Link>
                      </label>
                    </div>
                    <div
                      className="clientcode filelabel"
                      id="uniquefilereceipt">
                      <label className="errlabel text-danger text_error">
                        The file must be a file of type: pdf
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      P/I &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      id="pi"
                      name="pi"
                      {...register("pi", { required: true })}
                      aria-invalid={errors?.pi ? "true" : "false"}>
                      <option value="">Select P/I</option>
                      <option value="Sales Team">Sales Team</option>
                      <option value="Religio Team">Religio Team</option>
                    </select>
                    {errors?.pi?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Please Choose One P/I
                        </label>
                      </div>
                    )}
                  </div>
                  {/* AMC Extra Fields Start */}
                  {selectedValue === "AMC" && (
                    <div className="form-group col-md-6">
                      <label>
                        Renewel Month &nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="month"
                        className="form-control"
                        name="renewelmonth"
                        {...register("renewelmonth", { required: true })}
                        aria-invalid={errors?.renewelmonth ? "true" : "false"}
                      />
                      {errors?.renewelmonth?.type === "required" && (
                        <div className="text-danger text_error">
                          AMC Date is required
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {selectedValue === "AMC" && (
                  <div className="form-group">
                    <label>
                      AMC Value&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="amcvalue"
                      name="amcvalue"
                      value={amcvalue}
                      {...register("amcvalue", {
                        required: true,
                        onChange: amcvalueChange,
                        pattern: { value: /^[0-9\b]+$/ },
                      })}
                      aria-invalid={errors?.amcvalue ? "true" : "false"}
                    />
                    {errors?.amcvalue?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          AMC Value is required
                        </label>
                      </div>
                    )}
                    {errors?.amcvalue?.type === "pattern" && (
                      <div className="text-danger text_error ">
                        <label className="errlabel">
                          AMC Value can contain only Numbers
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {/* AMC Extra Fields End */}
                {selectedValue === "NewSales" && (
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
                        onChange: projectvalueChange,
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
                )}

                {selectedValue === "Outstanding" && (
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
                        onChange: projectvalueChange,
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
                )}

                <div className="form-group">
                  <label>GST 18%</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gst"
                    name="gst"
                    value={GSTAmount}
                    readOnly
                    {...register("gst")}
                  />
                </div>

                <div className="form-group">
                  <label>Total</label>
                  <input
                    type="text"
                    className="form-control"
                    id="total"
                    name="total"
                    value={totalAmount}
                    readOnly
                    {...register("total")}
                  />
                </div>

                <div className="form-group">
                  <label>Paid</label>
                  <input
                    type="text"
                    className="form-control"
                    name="paid"
                    {...register("paid", {
                      onChange: paidvalueChange,
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    id="balance"
                    name="balance"
                    value={balanceAmount}
                    {...register("balance")}
                    readOnly
                  />
                </div>

                {/* Outstanding Extra Fields Start */}
                {selectedValue === "Outstanding" && (
                  <div className="form-group">
                    <label>
                      Balance Paid{" "}
                      <b>
                        {currentYear}-{currentYear + 1}
                      </b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="balancepaid"
                      name="balancepaid"
                      value={paidbalvalue}
                      {...register("balancepaid", {
                        onChange: paidBalanceChange,
                        pattern: { value: /^[0-9\b]+$/ },
                      })}
                      aria-invalid={errors?.balancepaid ? "true" : "false"}
                    />
                    {errors?.balancepaid?.type === "pattern" && (
                      <div className="text-danger text_error ">
                        <label className="errlabel">
                          Balance Paid field can contain only numbers
                        </label>
                      </div>
                    )}
                  </div>
                )}
                {/* Outstanding Extra Fields End */}

                {/* <div className="form-group">
                          <label>Status</label>
                          <input type="text" className="form-control" id="status" name="status" value={paymentStatus} readOnly {...register("status")} />
                        </div> */}

                <div className="text-center">
                  <button
                    className="btn btn-gradient-primary font-weight-bold "
                    type="submit">
                    Save
                  </button>
                  &nbsp; &nbsp; &nbsp;
                  <Link
                    to="/Religio/PaymentStatus"
                    className="btn btn-gradient-primary font-weight-bold ">
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

export default PaymentEdit;
