import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import DataTable from "react-data-table-component";

function PaymentList() {
  // $(document).ready(function () {
  //   $(".myInput").on("keyup", function () {
  //     var value = $(this).val().toLowerCase();
  //     $(".Mytable tbody tr").filter(function () {
  //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  //     });
  //   });
  // });
  const exportpaymentTable = () => {
    axios
      .get(`${ApiUrl}/Religio/Payments/export`)
      .then((response) => {
        // Trigger file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "payment_data.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Export error:", error);
      });
  };
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  const fetchData = () => {
    fetch(`${ApiUrl}/Religio/Paymentlist`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        SetClientregister(resp.data);
        filterClientregister(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [register, SetClientregister] = useState([]);
  const [filterregister, filterClientregister] = useState([]);
  const navigate = useNavigate();

  const EditClientregistration = async (e, id) => {
    navigate("/Religio/Payment/Edit/" + id);
  };

  const ViewPaymentStatus = async (e, id) => {
    navigate("/Religio/Payment/View/" + id);
  };

  const deleteregister = async (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${ApiUrl}/Religio/Payment/delete/${id}`).then((res) => {
          fetchData();
        });
        Swal.fire("Deleted!", "Payment Status has been deleted.", "success");
      }
    });
  };
  const Moneyformat = (num) => {
    const curr = new Intl.NumberFormat("en-IN").format(num);

    return curr;
  };
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Congregation",
      selector: (row) => (
        <>
          <a
            onClick={(e) => ViewPaymentStatus(e, row.id)}
            className="my-component">
            {row.congregation}
          </a>
        </>
      ),
      sortable: true,
      width: "250px",
    },
    {
      name: "Financial Year",
      selector: (row) => row.financialyear,
      sortable: true,
      width: "150px",
    },
    {
      name: "Client Type",
      selector: (row) => row.clienttype,
      sortable: true,
      width: "150px",
    },
    {
      name: "Project Value",
      selector: (row) => Moneyformat(row.projectvalue),
      sortable: true,
      width: "150px",
    },
    {
      name: "Total",
      selector: (row) => Moneyformat(row.total),
      sortable: true,
      width: "100px",
    },
    {
      name: "Paid",
      selector: (row) => Moneyformat(row.paid),
      sortable: true,
      width: "100px",
    },
    {
      name: "AMC Value",
      selector: (row) => Moneyformat(row.amcvalue),
      sortable: true,
      width: "150px",
    },
    {
      name: "Balance",
      selector: (row) => Moneyformat(row.balance),
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => [
        <a
          onClick={(e) => ViewPaymentStatus(e, row.id)}
          style={{ cursor: "pointer", paddingRight: 4, color: "black" }}
          className="mdi mdi-eye"></a>,
        <a
          onClick={(e) => EditClientregistration(e, row.id)}
          style={{ cursor: "pointer", paddingRight: 4, color: "black" }}
          className="mdi mdi-pencil-box"></a>,

        <a
          onClick={(e) => deleteregister(e, row.id)}
          style={{ cursor: "pointer", color: "black" }}
          className="mdi mdi-delete"></a>,
      ],
      width: "100px",
      fixed: "right",
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
        backgroundColor: "#fafafa",
        // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
    pagination: {
      style: {
        fontWeight: "700",
        color: "black",
      },
    },
  };
  function filterdata(event) {
    var value = event.target.value;
    const keys = [
      "province",
      "financialyear",
      "clienttype",
      "total",
      "paid",
      "balance",
      "status",
    ];

    const filter = filterregister?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    SetClientregister(filter);
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-cash-multiple menu-icon" />
          </span>{" "}
          Payment Details
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <input
                    id="myInput"
                    type="text"
                    onChange={filterdata}
                    className="form-control myInput"
                    placeholder="Search.."
                  />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role == "admin" ? (
                    <Link to="/Religio/PaymentCreate">
                      <i
                        class="fa-solid fa-user-plus"
                        style={{ color: "black" }}></i>
                    </Link>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <label onClick={exportpaymentTable}>
                    <i
                      class="fa-solid fa-file-csv"
                      style={{ color: "black", cursor: "pointer" }}></i>
                  </label>
                </div>
              </div>
              <br></br>
              <DataTable
                columns={columns}
                data={register}
                pagination
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaymentList;
