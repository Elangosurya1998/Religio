import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";

function OurclientCreate() {

  const [Congre, Congregation] = useState([]);
  const [Prov, Province] = useState([]);

  const [congregation, Setcongregation] = useState([]);
  const [province, Setprovince] = useState([]);
  const [logo, SetLogo] = useState(null);

  const {
    register,
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

  function CongregationSelect(event) {
    var id = event.target.value
    Setcongregation(event.target.value)
    axios.get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        Province(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
  }

  function provinceSelect(event) {

    Setprovince(event.target.value)
  }

  function logoSelect(event) {
    SetLogo(event.target.files[0]);
  }

  function onSubmitOurClientform(data, e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('congregation', congregation);
    formData.append('province', province);
    formData.append('logo', logo);

    axios
      .post(`${ApiUrl}/Religio/HomeSections/OurClient/Store`, formData)
      .then((Response) => {

        console.log(Response);
        if (Response.status === 200) {
          Swal.fire(
            "Clients Logo Added Successfully..!",
            "",
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
              <form className="form-sample" encType="multipart/form-data" onSubmit={handleSubmit(onSubmitOurClientform)}>
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Congregation &nbsp;<span style={{ color: 'red' }}>*</span></label>
                    <select className="form-control" name="congregation" {...register("congregation", { required: true })} onChange={CongregationSelect}>
                      <option value="">Select Congregation</option>
                      {
                        Congre && Congre.map(item => (
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
                    <select className="form-control" name="province" {...register("province", { required: true })} onChange={provinceSelect}>
                      <option value="">Select Province</option>
                      {
                        Prov && Prov.map(item => (
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

                <div className="form-group">
                  <label>Logo &nbsp;<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="file" className="form-control" name="logo" accept=".jpg,.png,.jpeg" {...register("logo", { required: true })} onChange={logoSelect} />
                  {errors?.logo?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">
                        Please Choose Logo File
                      </label>
                    </div>
                  )}
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
