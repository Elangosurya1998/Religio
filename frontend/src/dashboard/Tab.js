import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import TabList from "./pages/Tab/TabList";

function Tabdata() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <TabList />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Tabdata;