import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppUrl from "../Api/Url";

function PaymentView() {
  const styles = {
    color: "#000000",
  };

  const {
    register,
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
        console.log(resp.data[0]);
        var data = resp.data[0].projectvalue;
        var amcdata = resp.data[0].amcvalue;
        var totalAmountdata = resp.data[0].total;
        var gstamountdata = resp.data[0].gst;
        var paiddata = resp.data[0].paid;
        var balancedata = resp.data[0].balance;
        const fileinvoice = resp.data[0].invoice;
        const filereceipt = resp.data[0].receipt;
        setbalanceamount(balancedata);
        resp.data[0].projectvalue = inr + " " + Moneyformat(data);
        resp.data[0].amcvalue = inr + " " + Moneyformat(amcdata);
        resp.data[0].total = inr + " " + Moneyformat(totalAmountdata);
        resp.data[0].gst = inr + " " + Moneyformat(gstamountdata);
        resp.data[0].paid = inr + " " + Moneyformat(paiddata);
        resp.data[0].balance = inr + " " + Moneyformat(balancedata);
        reset(resp.data[0]);

        const event = resp.data[0].clienttype;
        setSelectedValue(event);
        invoivefile(fileinvoice);
        receiptedFile(filereceipt);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [balanceAmount, setbalanceamount] = useState("");

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
  const [infile, invoivefile] = useState();
  const [resfile, receiptedFile] = useState();
  const [Pro, SetProvince] = useState([]);

  // Hide/Show Fields Based on Client Type
  const [selectedValue, setSelectedValue] = useState("");

  const now = new Date();
  const currentYear = now.getFullYear();

  const inrsymbols = <span>&#8377; </span>;
  const inr = inrsymbols.props.children;

  const Moneyformat = (num) => {
    const curr = new Intl.NumberFormat("en-IN").format(num);
    return curr;
  };
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-cash-multiple menu-icon" />
          </span>{" "}
          Payment Status
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample">
                <div className="form-group">
                  {balanceAmount == 0 ? (
                    <div className="alert alert-success">
                      Payment<strong> Paid.</strong>
                    </div>
                  ) : (
                    <div className="alert alert-danger">
                      Payment is <strong>Pending.</strong>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Client Type</label>
                  <select
                    className="form-control"
                    id="clienttype"
                    name="clienttype"
                    style={styles}
                    {...register("clienttype")}
                    disabled>
                    <option value="">Select Client</option>
                    <option value="NewSales">New Sales</option>
                    <option value="AMC">AMC</option>
                    <option value="Outstanding">Outstanding</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Congregation</label>
                    <select
                      className="form-control"
                      name="congregation"
                      {...register("congregation")}
                      style={styles}
                      disabled>
                      <option value="">Select Congregation</option>
                      {congre &&
                        congre.map((item) => (
                          <option value={item.id}>{item.congregation}</option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label>Province </label>
                    <select
                      className="form-control"
                      name="province"
                      {...register("province")}
                      style={styles}
                      disabled>
                      <option value="">Select Province</option>
                      {Pro &&
                        Pro.map((item) => (
                          <option value={item.id}>{item.province}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Product</label>
                  <select
                    className="form-control"
                    id="product"
                    name="product"
                    {...register("product")}
                    style={styles}
                    disabled>
                    <option value="">Select Product</option>
                    <option value="RELIGIO">RELIGIO</option>
                    <option value="AVOSA">AVOSA</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="place"
                    {...register("place")}
                    disabled
                  />
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Financial Year</label>
                    <input
                      type="text"
                      className="form-control"
                      name="financialyear"
                      {...register("financialyear")}
                      disabled
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Client Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="clientcode"
                      {...register("clientcode")}
                      disabled
                    />
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
                        // onChange: changeHandler,
                      })}
                      disabled
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
                  </div>
                  <div className=" form-group col-md-6">
                    <label>
                      Receipt&nbsp; &nbsp; ( Supported format is pdf )
                    </label>
                    <input
                      type="File"
                      className="form-control"
                      name="receipt"
                      disabled
                      {...register("receipt", {
                        // onChange: changeHandlerreceipt,
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
                  </div>
                </div>
                <div className="form-group">
                  <label>P/I</label>
                  <select
                    className="form-control"
                    id="pi"
                    name="pi"
                    style={styles}
                    {...register("pi")}
                    disabled>
                    <option value="">Select P/I</option>
                    <option value="Sales Team">Sales Team</option>
                    <option value="Religio Team">Religio Team</option>
                  </select>
                </div>
                {selectedValue === "AMC" && (
                  <div className="form-group">
                    <label>Renewel Month</label>
                    <input
                      type="month"
                      className="form-control"
                      name="renewelmonth"
                      {...register("renewelmonth")}
                      disabled
                    />
                  </div>
                )}

                {selectedValue === "AMC" && (
                  <div className="form-group">
                    <label>AMC Value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="amcvalue"
                      name="amcvalue"
                      {...register("amcvalue")}
                      disabled
                    />
                  </div>
                )}

                {selectedValue === "NewSales" && (
                  <div className="form-group">
                    <label>Project Value</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectvalue"
                      {...register("projectvalue")}
                      disabled
                    />
                  </div>
                )}

                {selectedValue === "Outstanding" && (
                  <div className="form-group">
                    <label>Project Value</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectvalue"
                      {...register("projectvalue")}
                      disabled
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>GST</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gst"
                    name="gst"
                    disabled
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
                    disabled
                    {...register("total")}
                  />
                </div>

                <div className="form-group">
                  <label>Paid</label>
                  <input
                    type="text"
                    className="form-control"
                    name="paid"
                    {...register("paid")}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    id="balance"
                    name="balance"
                    {...register("balance")}
                    disabled
                  />
                </div>

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
                      {...register("balancepaid")}
                      disabled
                    />
                  </div>
                )}
                <div className="text-center">
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

export default PaymentView;
