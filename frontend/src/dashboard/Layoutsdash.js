import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Content from "./includes/Content";
import Footer from "./includes/Footer";

function DashLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                
                <div className="main-panel">
                    
                    <Content />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default DashLayouts;