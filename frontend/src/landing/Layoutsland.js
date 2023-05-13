import { Link, useLocation } from "react-router-dom";
import React from 'react';

import Header from "./includes/Header";
import Main from "./includes/Main";
import Footer from "./includes/Footer";
import Demo from "./includes/Demo";
import Gallery from "./includes/Gallery";
import Aboutus from "./includes/Aboutus";

function Layoutsland() {

    const { pathname } = useLocation();

    return (
        <>
            <Header />
            {pathname == "" || pathname == "/" && <Main />}
            {pathname == "/Religio/Gallery" && <Gallery />}
            {pathname == "/Religio/Demo" && <Demo />}
            {pathname == "/Religio/Aboutus" && <Aboutus />}
            <Footer />
        </>
    );
}

export default Layoutsland;