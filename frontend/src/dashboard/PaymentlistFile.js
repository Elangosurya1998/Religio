import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ClientregistrationList from "./pages/clientregistration/clientregistrationList";
import PaymentList from "./pages/Payments/PaymentList";

function PaymentlistFile() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <PaymentList />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default PaymentlistFile;