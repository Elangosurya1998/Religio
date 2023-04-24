import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ClientregistrationList from "./pages/clientregistration/clientregistrationList";
import ProjectstatusList from "./pages/Projectstatus/projectstatusList";

function ProjectstatusLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ProjectstatusList />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ProjectstatusLayouts;