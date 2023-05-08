import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { YYYYMMDDTODDMMYYYY } from "../../../function/date";
import { Rating } from 'react-simple-star-rating';


function TrainningstatusList(){

  const fetchData = ()=>{
    fetch(`${ApiUrl}/onsitemeetstatus`).then((res) => {
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

const [ register, Setiosdata ] = useState([]);

const navigate = useNavigate();
const onsitestatusEdit =async (e,id)=>{
navigate("/Religio/onsiteedit/" + id);
}

const onsitestatusDelete = async (e,id) =>{
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
  axios.delete(`${ApiUrl}/onsitestatusdelete/${id}`).then((res)=>{
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


const [ online, setOnline ] = useState([]);
console.log(online);
const fetchDatas = () => {
  fetch(`${ApiUrl}/onlinemeetstatus`).then((res) => {
    return res.json();
  }).then((resp) => {
    // console.log(resp.data);
    setOnline(resp.data);
  }).catch((err) => {
    console.log(err.message);
  })
}
useEffect(() => {
  fetchDatas();
  }, [])

 

  const navigates = useNavigate();
  const onlinestatusEdit =async (e,id)=>{
  navigates("/Religio/onlineedit/" + id);
  }
  
  const onlinestatusDelete = async (e,id) =>{
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
    axios.delete(`${ApiUrl}/onlinestatusdelete/${id}`).then((res)=>{
      fetchDatas();
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
      {/* <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
          <i className="mdi mdi-account-plus menu-icon" />
        </span> Trainning Status
      </h3> */}
    </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
            <h4 className="card-title">Onsite StatusList</h4>
            <div className="row">
            <div className="col-lg-10">
            </div>
            <div className="col-lg-2"> 
            <Link to="/Religio/Trainningstatusadd" className="btn btn-gradient-light">Add</Link>
             </div>
          </div>

              <table className="table table-striped Mytable ">
                <thead>
                  <tr>

                    <th>Date</th>
                    <th>Number of days</th>
                    <th>Place</th>
                    <th>Trainning Expansive</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {         
                  register && register.map(item => (
                    <tr key={item.id}>
                        <td>{YYYYMMDDTODDMMYYYY(item.onsitedate)}</td>
                        <td>{item.onsitedays}</td>
                        <td>{item.expensive}</td>
                        <td>{item.onsiteplace }</td>
                        <td>
                        <Rating
                                initialValue = {item.onsiterating}
                                size={20}
                                readonly = {true}
                              /></td>
                        
                        <td id="noprint">
                          <a onClick={(e) => onsitestatusEdit(e, item.id)} style={{ cursor: 'pointer' }}  className="mdi mdi-pencil-box" id="print">Edit</a>
                        
                        &nbsp;<a onClick={(e) => onsitestatusDelete(e, item.id)} style={{ cursor: 'pointer' }} id className="mdi mdi-delete" >Delete</a>
                    </td>
                    </tr>   
                    ))
                  }
                </tbody>
              </table>
              <br/>
              <br/>
              <h4 className="card-title">Online Status List</h4>
              <table className="table table-striped Mytable ">
                <thead>
                  <tr>

                    <th>Date</th>             
                    <th>Number of hours</th>
                    <th>Meeting</th>
                    <th>Rating</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                {         
                  online && online.map(item => (
                    <tr key={item.id}>
                        <td>{YYYYMMDDTODDMMYYYY(item.onlinedate)}</td>
                        <td>{item.onlinehours}</td>
                        <td>{item.onlinemeeting}</td>
                        <td>
                   
                        <Rating
                                initialValue = {item.onlinerating}
                                size={20}
                                readonly = {true}
                              /></td>
                              
                        <td id="noprint">
                          <a onClick={(e) => onlinestatusEdit(e, item.id)} style={{ cursor: 'pointer' }}  className="mdi mdi-pencil-box" id="print">Edit</a>
                        
                        &nbsp;<a onClick={(e) => onlinestatusDelete(e, item.id)} style={{ cursor: 'pointer' }} id className="mdi mdi-delete" >Delete</a>
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
export default TrainningstatusList;