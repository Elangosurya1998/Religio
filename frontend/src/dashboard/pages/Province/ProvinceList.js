import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';

function ProvinceList(){
  
  $(document).ready(function () {
    $(".Province").on("keyup", function () {
      
        var value = $(this).val().toLowerCase();
        $(".ProvinceList tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
  //     $("#Emptysearch").click(function(){
  //   // $(".Province").val();
  //   //  fetchData();  
  // });
  });


  
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

const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));
const [ Pro, SetProvince ] = useState([]);
const navigate = useNavigate();
 const EditProvince =async (e,id)=>{
  navigate("/Religio/Province/Edit/" + id);
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
              {/* <h4 className="card-title">Province List</h4> */}
              <div className="row">
              <div className="col-lg-4">
              <input id="myInput" type="text" className="form-control Province" placeholder="Search.."  />
              {/* <div className="form-group">
        <div className="input-group">
          <input type="text" className="form-control Province" aria-label="Amount (to the nearest dollar)" />
          <div className="input-group-append">
          <span style={{ cursor: 'pointer' }} id="Emptysearch" className="input-group-text bg-gradient-primary text-white" ><i className="mdi mdi-close"></i></span>
          </div>
        </div>
      </div> */}
              </div>
              <div className="col-lg-6"></div>
              <div className="col-lg-2"> 
              {/* <Link to="/Religio/Province/Add" className="btn btn-gradient-light">Add</Link> */}
              {isLogedIn?.role == "admin" ?   <Link to="/Religio/Province/Add" className="btn btn-gradient-light">Add</Link> : ""}
               </div>
            </div>
            <br></br>
                <table className="table table-striped ProvinceList">
                  <thead>
                    <tr>
                      <th>Province</th>
                      <th>Congregation</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Address1</th>
                      {/* <th>Postcode</th> */}
                      {/* <th>City</th> */}
                      {/* <th>country</th> */}
                      {isLogedIn?.role == "admin" ? <th>Action</th> : "" }
                    </tr>
                  </thead>
                  <tbody>
                  {         
                    Pro && Pro.map(item => (
                      <tr key={item.id}>
                          <td>{item.province}</td>
                          <td>{item.congregation}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.address1}</td>
                          {/* <td>{item.Postcode }</td> */}
                          {/* <td>{item.City }</td> */}
                          {/* <td>{item.country }</td> */}
                          {isLogedIn?.role == "admin" ? <td id="noprint" ><a onClick={(e) => EditProvince(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-pencil-box" id="print">Edit</a>/
                              &nbsp;<a onClick={(e) => deleteProvince(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-delete" id="print">Delete</a>
                          </td> : "" }
                          
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