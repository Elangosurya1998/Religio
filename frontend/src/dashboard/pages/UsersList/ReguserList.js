import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery'

function ReguserList() {
    $(document).ready(function () {
        $(".User").on("keyup", function () {

            var value = $(this).val().toLowerCase();
            $(".UserList tbody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
    $(function () {
        $('table')
          .on('click', 'th', function () {
            var index = $(this).index(),
                rows = [],
                thClass = $(this).hasClass('asc') ? 'desc' : 'asc';
      
            $('#example th').removeClass('asc desc');
            $(this).addClass(thClass);
      
            $('#example tbody tr').each(function (index, row) {
              rows.push($(row).detach());
            });
      
            rows.sort(function (a, b) {
              var aValue = $(a).find('td').eq(index).text(),
                  bValue = $(b).find('td').eq(index).text();
      
              return aValue > bValue
                   ? 1
                   : aValue < bValue
                   ? -1
                   : 0;
            });
      
            if ($(this).hasClass('desc')) {
              rows.reverse();
            }
      
            $.each(rows, function (index, row) {
              $('#example tbody').append(row);
            });
          });
      });
    const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));

    const [User, Setuser] = useState([]);

    const fetchData = () => {
        fetch(`${ApiUrl}/Religio/UsersList`).then((res) => {
            return res.json();
        }).then((resp) => {
            Setuser(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    const deleteUser = async (e, id) => {
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
                axios.delete(`${ApiUrl}/Religio/UsersList/${id}`).then((res) => {
                    fetchData();
                })
                Swal.fire(
                    'Deleted!',
                    'Your record has been deleted.',
                    'success'
                )
            };

        })
    }
    const navigate = useNavigate();
    const EditCongregation =async (e,id)=>{
      navigate("/Religio/UserListEdit/" + id);
    }
    return (
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                        <i className="mdi mdi-account-plus menu-icon" />
                    </span> Users List
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
                                <div className="col-lg-4">
                                    <input id="myInput" type="text" className="form-control User" placeholder="Search.." />
                                </div>
                                <div className="col-lg-6"></div>
                                <div className="col-lg-2">
                                    {/* <Link to="/Religio/UserCreate" className="btn btn-gradient-light">Add</Link> */}
                                    {isLogedIn?.role == "admin" ?  <Link to="/Religio/UserCreate" className="btn btn-gradient-light">Add</Link> : ""}
                                </div>
                            </div>
                            <br></br>
                            <table className="table table-striped UserList"  id="example" style={{cursor:"pointer"}}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>User Name </th>
                                        <th>Email</th>
                                        <th>Assigned Role</th>
                                        {isLogedIn?.role == "admin" ? <th>Actions</th> : ""}
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        User && User.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                {isLogedIn?.role == "admin" ? <td id="noprint">
                                                    <a onClick={(e) => EditCongregation(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-pencil-box" id="print">Edit</a> /
                                                    &nbsp;
                                                    <a onClick={(e) => deleteUser(e, item.id)} style={{ cursor: 'pointer' }} className="mdi mdi-delete" id="print">Delete</a>
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

export default ReguserList;