import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams, useSearchParams, use } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import MemberdataList from "../Memberdata/MemberdataList";
// import ProjectstatusList from "../Projectstatus/projectstatusList";
// import HouseList from "../Housecommunity/HousecommunityList";
// import MobileappList from "../Mobileapp/MobileappList";
// import IosList from "../Ios/IosList";
// import TrainningstatusList from "../Trainningstatus/TrainningstatusList";
// import DatasupportList from "../Datasupport/DatasupportList";
import Projectstatuscreate from "../Projectstatus/projectstatusCreate";
import Housecommunitycreate from "../Housecommunity/HousecommunityCreate";
import Mobileappcreate from "../Mobileapp/MobileappCreate";
import Memberdatacreate from "../Memberdata/MemberdataCreate";
import Iosdatacreate from "../Ios/IosCreate";
import Trainningstatuscreate from "../Trainningstatus/TrainningstatusCreate";
import Datasupportcreate from "../Datasupport/DatasupportCreate";
// import { makeJsDate } from "./date";
import Form from 'react-bootstrap/Form';


function TabLists() {
  let [searchParams] = useSearchParams();
  // const [active, setActive] = useState(1)
  let active = searchParams.get('active') || 1

  useEffect(() => {
    //  setActive(searchParams.get('active'))
  }, [])

  // client
  const { id } = useParams();
  function dash(params) {
    fetch(`${ApiUrl}/allDashboardlist/${id}`).then((res) => {
      return res.json();
    }).then((resp) => {
      Setview(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })

  }

  useEffect(() => {
    dash()
  }, [])
  const [register, Setview] = useState([]);

  return (
    <div className="content-wrapper">
      <div className="page-header">

        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span> Basic Data Status
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Project Status Summary</h5>
              <div className="table-responsive">


                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">


                        {register &&
                          register.map((item) => (
                            <p key={item.id}>

                              <div class="row">
                                <div class="col">
                                  <p><b>Name :</b>&nbsp;&nbsp;{item.name}</p>
                                </div>

                              </div>



                              <div class="row">
                                <div class="col">
                                  <p><b>Congregation : </b>&nbsp;&nbsp;{item.congregation}</p>
                                </div>
                                <div class="col">
                                  <p><b>Province : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.province}</p>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col">
                                  <p><b>Name : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</p>
                                </div>
                                <div class="col">
                                  <p><b>Client Type : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.clienttype}</p>
                                </div>
                              </div>



                              <div class="row">
                                <div class="col">
                                  <p><b>Date of Joining : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.dateofjoining}</p>
                                </div>
                                <div class="col">
                                  <p><b>Contract Date : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.dateofcontractsigning}</p>
                                </div>
                              </div>


                              <div class="row">
                                <div class="col">
                                  <p><b>AMC Start Date : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.amcdate}</p>
                                </div>
                                <div class="col">
                                  <p><b>Financial Year : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.financialyear}</p>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col">
                                  <p><b>Project Value : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.projectvalue}</p>
                                </div>
                                <div class="col">
                                  <p><b>Renewel Month : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.renewelmonth}</p>
                                </div>
                              </div>




                              <div class="row">
                                <div class="col">
                                  <p><b>Email</b>&nbsp;&nbsp;&nbsp;&nbsp;{item.email}</p>
                                </div>
                                <div class="col">
                                  <p><b>Phone : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.mobile}</p>
                                </div>
                              </div>

                              <div class="row">
                                <div class="col">
                                  <p><b>Place</b>&nbsp;&nbsp;&nbsp;&nbsp;{item.place}</p>
                                </div>
                                <div class="col">
                                  <p><b>Address : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.address1}</p>

                                </div>
                              </div>
                              <hr></hr>

                              <div class="col">
                                <div class="row">
                                  <p><b>Total</b>&nbsp;&nbsp;&nbsp;&nbsp;{item.total}</p>
                                </div>
                                <div class="row">
                                  <p><b>Paid : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.paid}</p>
                                </div>
                                <div class="row">
                                  <p><b>Balance : </b>&nbsp;&nbsp;&nbsp;&nbsp;{item.balance}</p>
                                </div>
                              </div>


                            </p>


                          ))

                        }


                        <hr></hr>

                        <Tabs defaultIndex={active - 1}>
                          <TabList>
                            <Tab >Project status</Tab>
                            <Tab >House/Community</Tab>
                            <Tab >Member Data</Tab>
                            <Tab>Mobile App</Tab>
                            <Tab>IOS </Tab>
                            <Tab>Trainning Status</Tab>
                            <Tab>Data Support</Tab>
                          </TabList>

                          <TabPanel>
                            <Projectstatuscreate dash={dash} data={register?.[0]} />
                            {/* dash={dash} data={register?.[0]} */}
                          </TabPanel>

                          <TabPanel >
                            <Housecommunitycreate />
                          </TabPanel>

                          <TabPanel >
                            <Memberdatacreate />
                          </TabPanel>

                          <TabPanel >
                            <Mobileappcreate />
                          </TabPanel>

                          <TabPanel >
                            <Iosdatacreate />
                          </TabPanel>

                          <TabPanel >
                            <Trainningstatuscreate />
                          </TabPanel>

                          <TabPanel >
                            <Datasupportcreate />
                          </TabPanel>


                        </Tabs>

                        {/* <button onClick={makeJsDate}>Make Js Date</button> */}


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabLists;