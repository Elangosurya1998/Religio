import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";


function ProvinceList(){
  const fetchData = ()=>{
        fetch(`${ApiUrl}/Religio/Province`).then((res) => {
          return res.json();
      }).then((resp) => {
        SetProvince(resp.data);
      }).catch((err) => {
          console.log(err.message);
      })
  }

useEffect(() => {
  fetchData();
}, [])


const [ Pro, SetProvince ] = useState([]);
const navigate = useNavigate();
 const EditProvince =async (e,id)=>{
  navigate("/Religio/ProvinceEdit/" + id);
 }
const deleteProvince = async (e,id) =>{
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
     axios.delete(`${ApiUrl}/Religio/Province/${id}`).then((res)=>{
      fetchData();
     })
      Swal.fire(
        'Deleted!',
        'Your record has been deleted.',
        'success'
      )
    }
  })
}
    return (
        <div className="content-wrapper">
        <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span> Province List
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
            </li>
          </ul>
        </nav>
      </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
              <div className="col-lg-10">
              <h4 className="card-title">Province List</h4>
              </div>
              <div className="col-lg-2">
              <Link to="/Religio/ProvinceAdd" className="btn btn-gradient-light"><i className="mdi mdi-account-multiple-plus" />Add</Link>
            </div>
            </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Congregation Name </th>
                      <th>Province Name </th>
                      <th>Address1</th>
                      <th>State</th>
                      <th>Address2</th>
                      <th>Postcode</th>
                      {/* <th>City</th> */}
                      {/* <th>country</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {         
                    Pro && Pro.map(item => (
                      <tr key={item.id}>
                          <td>{item.Congregation}</td>
                          <td>{item.Province}</td>
                          <td>{item.Address1}</td>
                          <td>{item.state}</td>
                          <td>{item.Address2}</td>
                          <td>{item.Postcode }</td>
                          {/* <td>{item.City }</td> */}
                          {/* <td>{item.country }</td> */}
                          <td id="noprint" ><a onClick={(e) => EditProvince(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-pencil-box" id="print">Edit</a>/
                              &nbsp;<a onClick={(e) => deleteProvince(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-delete" id="print">Delete</a>
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
      );
}
export default ProvinceList;