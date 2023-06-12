import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function DomainrenewalEdit() {
  const { id } = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [DomainCreated, setDomainCreated] = useState(null);
  const [DomainCreate, setDomainCreate] = useState(null);
  const [domainexpireDate, setdomainexpireDate] = useState(null);
  const [domainexpiredDate, setdomainexpiredDate] = useState(null);
  function onSubmitDomainrenewalform(data, e) {
    e.preventDefault();
    data.domain_create_date = DomainCreated;
    data.domain_expire_date = domainexpiredDate;
    axios
      .put(`${ApiUrl}/Religio/Domainrenewal/update/${id}`, data)
      .then((Response) => {
        if (Response.status === 200) {
          Swal.fire("Domain Updated Successfully..!", "", "success");
          e.target.reset();
          navigate("/Religio/DomainRenewal");
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

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Domainrenewal/edit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data);

        const domain = resp.data.domain_create_date;
        const domainparts = domain.split("-");
        const datajoning = new Date(
          domainparts[0],
          domainparts[1],
          domainparts[2]
        );
        setDomainCreate(datajoning);
        const domainexpire = resp.data.domain_expire_date;
        const expireparts = domainexpire.split("-");
        const datajoningexpire = new Date(
          expireparts[0],
          expireparts[1],
          expireparts[2]
        );
        setdomainexpireDate(datajoningexpire);
        setDomainCreated(domain);
        setdomainexpiredDate(domainexpire);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  const handledomaincreate = (date) => {
    const month = date.getMonth().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const dates = date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const datedata = `${date.getFullYear()}-${month}-${dates}`;

    setDomainCreate(date);

    setDomainCreated(datedata);
  };

  const handledomainexpired = (date) => {
    const month = date.getMonth().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const dates = date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const datedata = `${date.getFullYear()}-${month}-${dates}`;

    setdomainexpireDate(date);

    setdomainexpiredDate(datedata);
  };
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-domain menu-icon" />
          </span>{" "}
          Domain Renewel Update
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                className="form-sample"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmitDomainrenewalform)}>
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Site Name &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sitename"
                      placeholder="Site Name"
                      {...register("sitename", {
                        required: true,
                      })}
                      aria-invalid={errors?.sitename ? "true" : "false"}
                    />
                    {errors?.sitename?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Site Name is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Site URL &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="siteurl"
                      placeholder="Site URL"
                      {...register("siteurl", {
                        required: true,
                        pattern: { value: regex },
                      })}
                      aria-invalid={errors?.siteurl ? "true" : "false"}
                    />
                    {errors?.siteurl?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">Site URL is required</label>
                      </div>
                    )}
                    {errors?.siteurl?.type === "pattern" && (
                      <div className="text-danger text_error ">
                        <label className="errlabel">Invalid url</label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Server Details &nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="serverdetail"
                      placeholder="Server Detail"
                      {...register("serverdetail", {
                        required: true,
                      })}
                      aria-invalid={errors?.serverdetail ? "true" : "false"}
                    />
                    {errors?.serverdetail?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Server Detail is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Server Name &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="servername"
                      placeholder="Server Name "
                      {...register("servername", {
                        required: true,
                      })}
                      aria-invalid={errors?.servername ? "true" : "false"}
                    />
                    {errors?.servername?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Server Name is required
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Domain Create Date &nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      name="domain_create_date"
                      {...register("domain_create_date")}
                      className="form-control"
                      selected={DomainCreate}
                      autoComplete="off"
                      onChange={handledomaincreate}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={25}
                      dateFormat="dd-MM-yyyy"
                    />
                    {errors?.domain_create_date?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Domain Create Date is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Domain Expire Date &nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      name="domain_expire_date"
                      {...register("domain_expire_date")}
                      className="form-control"
                      selected={domainexpireDate}
                      autoComplete="off"
                      onChange={handledomainexpired}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={25}
                      dateFormat="dd-MM-yyyy"
                    />
                    {errors?.domain_expire_date?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Domain Expire Date is required
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-gradient-primary font-weight-bold"
                    type="submit">
                    Update
                  </button>
                  &nbsp; &nbsp; &nbsp;
                  <Link
                    to="/Religio/DomainRenewal"
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
export default DomainrenewalEdit;
