import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";

function OurclientCreate() {

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Province/Congregation`).then((res) => {
      return res.json();
    }).then((resp) => {
      Congregation(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [Congre, Congregation] = useState([]);

  function CongregationSelect(event) {
    var id = event.target.value
    axios.get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        SetProvince(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
  }
  const [Province, SetProvince] = useState([]);

  function onSubmitCongregationform(data, e) {
    axios
      .post(`${ApiUrl}/Religio/HomeSections/OurClient/Store`, data)
      .then((Response) => {
        console.log(Response);
        if (Response.status === 200) {
          Swal.fire(
            "Created Successfully..!",
            "Congregation Add ..",
            "success"
          );
          e.target.reset();
          navigate("/Religio/HomeSections/OurClient");
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
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-multiple-plus menu-icon" />
          </span> Our Clients
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample" encType="multipart/form-data" onSubmit={handleSubmit(onSubmitCongregationform)}>
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <select className="form-control" name="congregation" onChange={CongregationSelect}>
                      <option value="">Select Congregation</option>
                      {
                        Congre && Congre.map(item => (
                          <option value={item.id}>{item.congregation}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Province &nbsp;<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className="form-control" name="province">
                      <option value="">Select Province</option>
                      {
                        Province && Province.map(item => (
                          <option value={item.id}>{item.province}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Logo &nbsp;<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="file" className="form-control" accept=".jpg,.png,.jpeg" />
                </div>

                <div className="text-center">
                  <button className="btn btn-gradient-primary font-weight-bold " type="submit">Save</button>
                  &nbsp; &nbsp; &nbsp;
                  <Link to="" className="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
export default OurclientCreate;
