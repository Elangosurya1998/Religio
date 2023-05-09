import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams, useSearchParams, use } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MemberdataList from "../Memberdata/MemberdataList";
import ProjectstatusList from "../Projectstatus/projectstatusList";
import HouseList from "../Housecommunity/HousecommunityList";
import MobileappList from "../Mobileapp/MobileappList";
import IosList from "../Ios/IosList";
import TrainningstatusList from "../Trainningstatus/TrainningstatusList";
import DatasupportList from "../Datasupport/DatasupportList";
// import { makeJsDate } from "./date";


function TabLists(){
  let [searchParams] = useSearchParams();
  // const [active, setActive] = useState(1)
  let active = searchParams.get('active') || 1

  useEffect(()=>{
  //  setActive(searchParams.get('active'))
  },[])

    return (
      <div className="content-wrapper">
      <div className="page-header">
        {/* Basic data Status */}
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
            {/* <h4 className="card-title">Data Status Update List</h4> */}
            
            <div className="row">
            <div className="col-lg-10">
            </div>
          
          </div>

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
        <ProjectstatusList />
        </TabPanel>

        <TabPanel >
       <HouseList/>
        </TabPanel>

        <TabPanel >
        <MemberdataList />
        </TabPanel>

        <TabPanel >
        <MobileappList/>
        </TabPanel>

        <TabPanel >
        <IosList/>
        </TabPanel>

        <TabPanel >
        <TrainningstatusList/>
        </TabPanel>

        <TabPanel >
        <DatasupportList/>
        </TabPanel>


        </Tabs>

  {/* <button onClick={makeJsDate}>Make Js Date</button> */}
      
             
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default TabLists;