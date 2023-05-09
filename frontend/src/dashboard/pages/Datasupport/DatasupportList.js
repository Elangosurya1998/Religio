import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";

function DatasupportList(){

  const fetchData = ()=>{
    fetch(`${ApiUrl}/Datasupport`).then((res) => {
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
const DatasupportEdit =async (e,id)=>{
navigate("/Religio/DatasupportEdit/" + id);
}
const DatasupportDelete = async (e,id) =>{

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
  axios.delete(`${ApiUrl}/Datasupportdelete/${id}`).then((res)=>{
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
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
            <div className="row">
            <div className="col-lg-10">
            </div>
            <div className="col-lg-2"> 
            <Link to="/Religio/Datasupportadd" className="btn btn-gradient-light">Add</Link>
             </div>
          </div>
              <table className="table table-striped Mytable table-responsive">
                <thead>
                  <tr>
                    <th>No Of Communities</th>
                    <th>No Of Institution</th>
                    <th>No Of Members</th>
                    <th>No Of Records</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {         
                  register && register.map(item => (
                    <tr key={item.id}>
                        <td>{item.noofcommunity }</td>
                        <td>{item.noofinstitution}</td>
                        <td>{item.noofmembers}</td>
                        <td>{item.dataentry}</td>
                        <td id="noprint"><a onClick={(e) => DatasupportEdit(e, item.id)} style={{ cursor: 'pointer' }}  className="mdi mdi-pencil-box" id="print">Edit</a>
                        
                        &nbsp;<a onClick={(e) => DatasupportDelete(e, item.id)} style={{ cursor: 'pointer' }} id className="mdi mdi-delete" >Delete</a>
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
export default DatasupportList;