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
      //reset(resp.data[0])
      const event = resp.data[0].clienttype;
      const projectvalue = resp.data[0].projectvalue;
      const paid = resp.data[0].paid;
      const amcvalue = resp.data[0].amcvalue;
      const gstvalue = resp.data[0].gst;
      const balanceamount = resp.data[0].balance;
      const totalamount = resp.data[0].total;
      const renewelmonth = resp.data[0].renewelmonth;
      const paidbalvalue = resp.data[0].balancepaid;
      const congregation = resp.data[0].congregation;
      const province = resp.data[0].province;
      const place = resp.data[0].place;
      const clientcode = resp.data[0].clientcode;
      const financialyear = resp.data[0].financialyear;
      const product = resp.data[0].product;
      
      setSelectedValue(event);
      setPaidvalue(paid);
      setAmcvalue(amcvalue);
      setGstamount(gstvalue);
      setbalanceamount(balanceamount);
      setTotalamount(totalamount);
      setRenewelmonth(renewelmonth);
      setProjectvalue(projectvalue);
      setPaidbalvalue(paidbalvalue);
      setCongregation(congregation);
      setProvince(province);
      setPlace(place);
      setFinancialyear(financialyear);
      setClientcode(clientcode);
      setPi(pi);
      setProduct(product);

    }).catch((err) => {
      console.log(err.message);
    })
    }, [])

    const [projectvalue, setProjectvalue] = useState("");
    const [paidvalue, setPaidvalue] = useState("");
    const [amcvalue, setAmcvalue] = useState("");
    const [gstamount, setGstamount] = useState("");
    const [balanceAmount, setbalanceamount] = useState("");
    const [totalAmount, setTotalamount] = useState("");
    const [renewelmonth, setRenewelmonth] = useState("");
    const [paidbalvalue, setPaidbalvalue] = useState("");
    const [congregation, setCongregation] = useState("");
    const [province, setProvince] = useState("");
    const [place, setPlace] = useState("");
    const [financialyear, setFinancialyear] = useState("");
    const [clientcode, setClientcode] = useState("");
    const [pi, setPi] = useState("");
    const [product, setProduct] = useState("");
    

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
  const paidvalueChange = (event) => {
    setPaidvalue(event.target.value);
  };

  const paidBalanceChange = (event) => {
    setPaidbalvalue(event.target.value);
  };

  const now = new Date();
  const currentYear = now.getFullYear();

  const inrsymbols = <span>&#8377; </span>;
  const inr = inrsymbols.props.children;

  const Moneyformat = (num) => {
    const curr = new Intl.NumberFormat('en-IN').format(num);
    return curr;
 };
console.log(balanceAmount);
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-cash-multiple menu-icon" />
          </span> Payment Status
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample">
                <div className="form-group">

                  {balanceAmount == 0 ? <div className="alert alert-success">Payment<strong> Paid.</strong></div> : <div className="alert alert-danger">Payment is <strong>Pending.</strong></div>}

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
                    <select className="form-control" value={congregation} name="congregation"
                      {...register("congregation")} style={styles} disabled>
                      <option value="">Select Congregation</option>
                      {congre && congre.map(item => (
                        <option value={item.id}>{item.congregation}</option>))
                      }
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label>Province </label>
                    <select className="form-control" value={province} name="province"
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
                  <select className="form-control" id="product" value={product} name="product" {...register("product")} style={styles} disabled>
                    <option value="">Select Product</option>
                    <option value="RELIGIO">RELIGIO</option>
                    <option value="AVOSA">AVOSA</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Place</label>
                  <input type="text" className="form-control" value={place} name="place"
                    {...register("place")} disabled />
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Financial Year</label>
                    <input type="text" className="form-control" value={financialyear} name="financialyear" {...register("financialyear")} disabled />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Client Code</label>
                    <input type="text" className="form-control" value={clientcode} name="clientcode" {...register("clientcode")} disabled />
                  </div>
                </div>

                <div className="form-group">
                  <label>P/I</label>
                  <select className="form-control" id="pi" value={pi} name="pi" style={styles} {...register("pi")} disabled>
                    <option value="">Select P/I</option>
                    <option value="Sales Team">Sales Team</option>
                    <option value="Religio Team">Religio Team</option>
                  </select>

                </div>
                {selectedValue === 'AMC' && (
                  <div className="form-group">
                    <label>Renewel Month</label>
                    <input type="month" className="form-control" value={renewelmonth} name="renewelmonth" {...register("renewelmonth")} disabled />
                  </div>
                )}

                {selectedValue === 'AMC' && (
                  <div className="form-group">
                    <label>AMC Value</label>
                    <input type="text" className="form-control" id="amcvalue" name="amcvalue" value={inr +' '+ Moneyformat(amcvalue)}
                      {...register("amcvalue")} disabled />
                  </div>
                )}

                {selectedValue === "NewSales" && (
                  <div className="form-group">
                    <label>Project Value</label>
                    <input type="text" className="form-control" name="projectvalue" value={inr +' '+ Moneyformat(projectvalue)}
                      {...register("projectvalue")} disabled />
                  </div>
                )}

                {selectedValue === "Outstanding" && (
                  <div className="form-group">
                    <label>Project Value</label>
                    <input type="text" className="form-control" name="projectvalue" value={inr +' '+ Moneyformat(projectvalue)}
                      {...register("projectvalue")} disabled />
                  </div>
                )}

                <div className="form-group">
                  <label>GST</label>
                  <input type="text" className="form-control" id="gst" name="gst" value={inr +' '+ Moneyformat(gstamount)} disabled {...register("gst")} />
                </div>

                <div className="form-group">
                  <label>Total</label>
                  <input type="text" className="form-control" id="total" name="total" value={inr +' '+ Moneyformat(totalAmount)} disabled {...register("total")} />
                </div>

                <div className="form-group">
                  <label>Paid</label>
                  <input type="text" className="form-control" name="paid" value={inr +' '+ Moneyformat(paidvalue)} {...register("paid")} disabled />
                </div>

                <div className="form-group">
                  <label>Balance</label>
                  <input type="text" className="form-control" id="balance" name="balance" value={inr +' '+ Moneyformat(balanceAmount)}
                    {...register("balance")} disabled />
                </div>


                {selectedValue === 'Outstanding' && (
                  <div className="form-group">
                    <label>Balance Paid <b>{currentYear}-{currentYear + 1}</b></label>
                    <input type="text" className="form-control" id="balancepaid" name="balancepaid" value={inr +' '+ Moneyformat(paidbalvalue)}
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