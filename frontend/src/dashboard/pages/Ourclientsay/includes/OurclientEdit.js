import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function OurclientEdit() {
  const [Congre, Congregation] = useState([]);
  const [Prov, Province] = useState([]);
  const [Client, Clients] = useState([]);

  const [congregation, Setcongregation] = useState();
  const [province, Setprovince] = useState();
  const [client, Setclient] = useState();
  const [logo, SetLogo] = useState();
  const [logoshow, showlogo] = useState();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/HomeSections/OurClient/edit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
        SetLogo(resp.data[0].logo);
        showlogo(resp.data[0].logo);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Clientregistration`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        Clients(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
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

  function CongregationSelect(event) {
    var id = event.target.value;
    Setcongregation(event.target.value);
    reset({ province: "", client: "" });
    axios
      .get(`${ApiUrl}/Religio/Province/get/${id}`)
      .then((response) => {
        Province(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function provinceSelect(event) {
    var id = event.target.value;
    Setprovince(event.target.value);
    axios
      .get(`${ApiUrl}/Religio/Clients/get/${id}`)
      .then((response) => {
        Clients(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clientSelect(event) {
    Setclient(event.target.value);
  }

  function logoSelect(event) {
    $(".filelabel").hide();
    SetLogo(event.target.files[0]);
  }

  function onSubmitOurClientform(data, e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("congregation", data.congregation);
    formData.append("province", data.province);
    formData.append("client", data.client);
    formData.append("logo", logo);

    axios
      .post(`${ApiUrl}/Religio/HomeSections/OurClient/update/${id}`, formData)
      .then((Response) => {
        console.log(Response);
        if (Response.status === 200) {
          Swal.fire("Clients Logo Updated Successfully..!", "", "success");
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
          </span>{" "}
          Our Clients Update
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                className="form-sample"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmitOurClientform)}>
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Congregation &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="congregation"
                      {...register("congregation", { required: true })}
                      onChange={CongregationSelect}>
                      <option value="">Select Congregation</option>
                      {Congre &&
                        Congre.map((item) => (
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
                    <label>
                      Province &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="province"
                      {...register("province", { required: true })}
                      onChange={provinceSelect}>
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
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Clients &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="client"
                      {...register("client", { required: true })}
                      onChange={clientSelect}>
                      <option value="">Select Client</option>
                      {Client &&
                        Client.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {errors?.client?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">Please Select Client</label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Logo &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      accept=".jpg,.png,.jpeg"
                      {...register("logo")}
                      onChange={logoSelect}
                    />
                    <div
                      className="Getfile filelabel"
                      style={{ color: "black", padding: "10px" }}>
                      {logoshow}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-gradient-primary font-weight-bold "
                    type="submit">
                    Update
                  </button>
                  &nbsp; &nbsp; &nbsp;
                  <Link
                    to="/Religio/HomeSections/OurClient"
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
export default OurclientEdit;
