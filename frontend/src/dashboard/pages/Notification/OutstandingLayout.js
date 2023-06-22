import Navbar from "../../includes/Navbar";
import Sidemenubar from "../../includes/Sidemenubar";
import Footer from "../../includes/Footer";

import OutstandingShow from "./Outstanding";
function OutstandingShowlayout() {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidemenubar />
        <div className="main-panel">
          <OutstandingShow />
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default OutstandingShowlayout;
