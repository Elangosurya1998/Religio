import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import { YYYYMMDDTODDMMYYYY } from "../../../function/date";

function IosList() {

  const fetchData = () => {
    fetch(`${ApiUrl}/ios`).then((res) => {
      return res.json();
    }).then((resp) => {
      Setiosdata(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  const [register, Setiosdata] = useState([]);

  const navigate = useNavigate();
  const iosdataEdit = async (e, id) => {
    navigate("/Religio/IosEdit/" + id);
  }
  const iosdataDelete = async (e, id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${ApiUrl}/iosdelete/${id}`).then((res) => {
          fetchData();
        })
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        );

      }
    })

  }

  return (

    <div className="content-wrapper">
      <div className="page-header">
        {/* Basic data Status */}
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span> IOS Data
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">IOS Data List</h4>
              <div className="row">
                <div className="col-lg-10">
                </div>
                <div className="col-lg-2">
                  <Link to="/Religio/Iosadd" className="btn btn-gradient-light">Add</Link>
                </div>
              </div>
              <div class="row">
                <table className="table table-striped Mytable table-responsive mx-auto w-auto">
                  <thead>
                    <tr>

                      <th>IOS Target Date</th>
                      <th>IOS Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      register && register.map(item => (
                        <tr key={item.id}>
                          <td>{YYYYMMDDTODDMMYYYY(item.Iosdate)}</td>
                          <td>{item.Iosstatus}</td>
                          <td id="noprint"><a onClick={(e) => iosdataEdit(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-pencil-box" id="print">Edit</a>

                            &nbsp;<a onClick={(e) => iosdataDelete(e, item.id)} style={{ cursor: 'pointer' }} id className="mdi mdi-delete" >Delete</a>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}
export default IosList;