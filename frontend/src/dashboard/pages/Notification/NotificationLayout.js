import Navbar from "../../includes/Navbar";
import Sidemenubar from "../../includes/Sidemenubar";
import Footer from "../../includes/Footer";
import { useLocation } from "react-router-dom";

import NotificationShow from "./Notification";
function NotificationShowlayout() {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidemenubar />
        <div className="main-panel">
          <NotificationShow />
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default NotificationShowlayout;
