import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function PaymentView() {

  const styles = {
    color: '#000000'
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });
  const { id } = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Paymentedit/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      reset(resp.data[0])
      const event = resp.data[0].clienttype;
      const proevent = resp.data[0].projectvalue;
      const paid = resp.data[0].paid;
      setSelectedValue(event);
      setOrgvalue(proevent);
      setPaidvalue(paid);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

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

  function CongregationSelect(event) {
    var id = event.target.value
    console.log(id);
    axios.get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        SetProvince(response.data.data)
        console.log(response.data.data);
      }).catch((err) => {
        console.log(err);
      })
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

  const [Pro, SetProvince] = useState([]);

  // Hide/Show Fields Based on Client Type
  const [selectedValue, setSelectedValue] = useState('');
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Auto Calculate Balance
  const [paidvalue, setPaidvalue] = useState("");
  const [amcvalue, setAmcvalue] = useState("");
  const [orgvalue, setOrgvalue] = useState("");

  const [paidbalvalue, setPaidbalvalue] = useState("");

  const projectvalueChange = (event, e) => {
    setOrgvalue(event.target.value);

  };

  const paidvalueChange = (event) => {
    setPaidvalue(event.target.value);
  };

  const amcvalueChange = (event) => {
    setAmcvalue(event.target.value);
    setOrgvalue(event.target.value)
  };

  const paidBalanceChange = (event) => {
    setPaidbalvalue(event.target.value);
  };

  // GST Calculation

  const originalAmount = orgvalue;

  const GSTPercentage = 18;

  const GSTAmount = (originalAmount * GSTPercentage) / 100;

  const totalAmount = Number(originalAmount) + Number(GSTAmount);

  const balanceAmount = paidbalvalue === '' ? totalAmount - paidvalue : totalAmount - paidvalue - paidbalvalue;

  const balpaid = paidbalvalue;

  const paymentStatus = balanceAmount !== 0 ? "Pending" : "Completed";

  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-multiple-plus menu-icon" />
          </span> Payment Status
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample">
                <div className="form-group">

                  {paymentStatus == 'Completed' ? <div className="alert alert-success">Payment<strong> Paid.</strong></div> : <div className="alert alert-danger">Payment is <strong>Pending.</strong></div>}

                </div>

                <div className="form-group">
                  <label>Client Type</label>
                  <select className="form-control" id="clienttype" value={selectedValue} name="clienttype" style={styles} {...register("clienttype")} disabled >
                    <option value="">Select Client</option>
                    <option value="NewSales">New Sales</option>
                    <option value="AMC">AMC</option>
                    <option value="Outstanding">Outstanding</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Congregation</label>
                    <select className="form-control" name="congregation"
                      {...register("congregation")} style={styles} disabled>
                      <option value="">Select Congregation</option>
                      {congre && congre.map(item => (
                        <option value={item.id}>{item.congregation}</option>))
                      }
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label>Province </label>
                    <select className="form-control" name="province"
                      {...register("province")} style={styles} disabled  >
                      <option value="">Select Province</option>
                      {
                        Pro && Pro.map(item => (
                          <option value={item.id}>{item.province}</option>))
                      }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Product</label>
                  <select className="form-control" id="product" name="product" {...register("product")} style={styles} disabled>
                    <option value="">Select Product</option>
                    <option value="RELIGIO">RELIGIO</option>
                    <option value="AVOSA">AVOSA</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Place</label>
                  <input type="text" className="form-control" name="place"
                    {...register("place")} disabled />
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Financial Year</label>
                    <input type="text" className="form-control" name="financialyear"
                      {...register("financialyear")} disabled />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Client Code</label>
                    <input type="text" className="form-control" name="clientcode"
                      {...register("clientcode")} disabled />
                  </div>
                </div>

                <div className="form-group">
                  <label>P/I</label>
                  <select className="form-control" id="pi" name="pi" style={styles} {...register("pi")} disabled>
                    <option value="">Select P/I</option>
                    <option value="Sales Team">Sales Team</option>
                    <option value="Religio Team">Religio Team</option>
                  </select>

                </div>
                {selectedValue === 'AMC' && (
                  <div className="form-group">
                    <label>Renewel Month</label>
                    <input type="month" className="form-control" name="renewelmonth"
                      {...register("renewelmonth")} disabled />
                  </div>
                )}

                {selectedValue === 'AMC' && (
                  <div className="form-group">
                    <label>AMC Value</label>
                    <input type="text" className="form-control" id="amcvalue" name="amcvalue" value={amcvalue}
                      {...register("amcvalue")} disabled />
                  </div>
                )}

                {selectedValue === "New Sales" && (
                  <div className="form-group">
                    <label>Project Value</label>
                    <input type="text" className="form-control" name="projectvalue"
                      {...register("projectvalue")} disabled />
                  </div>
                )}

                {selectedValue === "Outstanding" && (
                  <div className="form-group">
                    <label>Project Value</label>
                    <input type="text" className="form-control" name="projectvalue"
                      {...register("projectvalue")} disabled />
                  </div>
                )}

                <div className="form-group">
                  <label>GST</label>
                  <input type="text" className="form-control" id="gst" name="gst" value={GSTAmount} disabled {...register("gst")} />
                </div>

                <div className="form-group">
                  <label>Total</label>
                  <input type="text" className="form-control" id="total" name="total" value={totalAmount} disabled {...register("total")} />
                </div>

                <div className="form-group">
                  <label>Paid</label>
                  <input type="text" className="form-control" name="paid" value={paidvalue} {...register("paid")} disabled />
                </div>

                <div className="form-group">
                  <label>Balance</label>
                  <input type="text" className="form-control" id="balance" name="balance" value={balanceAmount}
                    {...register("balance")} disabled />
                </div>


                {selectedValue === 'Outstanding' && (
                  <div className="form-group">
                    <label>Balance Paid <b>{currentYear}-{currentYear + 1}</b></label>
                    <input type="text" className="form-control" id="balancepaid" name="balancepaid" value={paidbalvalue}
                      {...register("balancepaid")} disabled />
                  </div>
                )}
                <div className="text-center">
                  <Link to="/Religio/PaymentStatus" className="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
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