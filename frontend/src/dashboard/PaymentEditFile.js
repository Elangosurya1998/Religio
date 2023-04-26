import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import PaymentEdit from "./pages/Payments/paymentEdit";

function PaymentEditFile() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <PaymentEdit />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default PaymentEditFile;