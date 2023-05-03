import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import { YYYYMMDDTODDMMYYYY } from "../../../function/date";

function HouseList(){

  const fetchData = ()=>{
    fetch(`${ApiUrl}/housecommunity`).then((res) => {
      return res.json();
  }).then((resp) => {
    Sethouse(resp.data);
  }).catch((err) => {
      console.log(err.message);
  })
}
useEffect(() => {
fetchData();
}, [])

const [ register, Sethouse ] = useState([]);

const navigate = useNavigate();
const HousecommunityEdit =async (e,id)=>{
navigate("/Religio/HousecommunityEdit/" + id);
}
const HousecommunityDelete = async (e,id) =>{

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
  axios.delete(`${ApiUrl}/housecommunitydelete/${id}`).then((res)=>{
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
        </span> House / Community Data
      </h3>
    </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
            <h4 className="card-title">House / Community Data List</h4>
            <div className="row">
            <div className="col-lg-10">
            </div>
            <div className="col-lg-2"> 
            <Link to="/Religio/Housecommunityadd" className="btn btn-gradient-light">Add</Link>
             </div>
          </div>
              <table className="table table-striped Mytable table-responsive">
                <thead>
                  <tr>
                    <th>Target Date</th>
                    <th> Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {         
                  register && register.map(item => (
                    <tr key={item.id}>
                        <td>{YYYYMMDDTODDMMYYYY(item.housedate) }</td>
                        <td>{item.housestatus}</td>
                        <td id="noprint"><a onClick={(e) => HousecommunityEdit(e, item.id)} style={{ cursor: 'pointer' }}  className="mdi mdi-pencil-box" id="print">Edit</a>
                        
                        &nbsp;<a onClick={(e) => HousecommunityDelete(e, item.id)} style={{ cursor: 'pointer' }} id className="mdi mdi-delete" >Delete</a>
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
export default HouseList;