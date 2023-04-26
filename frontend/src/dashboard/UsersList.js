import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";
import "./scss/style.scss";
import ReguserList from "./pages/UsersList/ReguserList";


function UsersList() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ReguserList />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default UsersList;