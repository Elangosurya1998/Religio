import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import PaymentCreate from "./pages/Payments/PaymentCreate";


function PaymentCreateFile() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                   <PaymentCreate/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default PaymentCreateFile;