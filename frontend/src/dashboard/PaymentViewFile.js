import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import PaymentView from "./pages/Payments/paymentView";

function PaymentViewFile() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <PaymentView />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default PaymentViewFile;