import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import { YYYYMMDDTODDMMYYYY } from "../../../function/date";
function MobileappList(){
  

  const fetchData = ()=>{
    fetch(`${ApiUrl}/mobileapp`).then((res) => {
      return res.json();
  }).then((resp) => {
    Setmobileapp(resp.data);
  }).catch((err) => {
      console.log(err.message);
  })
}
useEffect(() => {
fetchData();
}, [])

const [ register, Setmobileapp ] = useState([]);



const navigate = useNavigate();
const mobileappEdit =async (e,id)=>{
navigate("/Religio/Mobileappedit/" + id);
}
const mobileappDelete = async (e,id) =>{

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
  axios.delete(`${ApiUrl}/mobileappdelete/${id}`).then((res)=>{
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
      {/* <div className="page-header">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
          <i className="mdi mdi-account-plus menu-icon" />
        </span> Mobile App
      </h3>
    </div> */}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
            {/* <h4 className="card-title"> Mobile App Data List</h4> */}
            <div className="row">
            <div className="col-lg-10">
            </div>
            <div className="col-lg-2"> 
            <Link to="/Religio/Mobileappadd" className="btn btn-gradient-light">Add</Link>
             </div>
          </div>
              <table className="table table-striped Mytable table-responsive">
                <thead>
                  <tr>
                    <th>Mobileapp Target Date</th>
                    <th>Mobileapp Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {         
                  register && register.map(item => (
                    <tr key={item.id}>
                        <td>{YYYYMMDDTODDMMYYYY(item.mobiledate)}</td>
                        <td>{item.mobilestatus }</td>
                        <td id="noprint"><a onClick={(e) => mobileappEdit(e, item.id)} style={{ cursor: 'pointer' }}  className="mdi mdi-pencil-box" id="print">Edit</a>
                        
                        &nbsp;<a onClick={(e) => mobileappDelete(e, item.id)} style={{ cursor: 'pointer' }} id className="mdi mdi-delete" >Delete</a>
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
export default MobileappList;