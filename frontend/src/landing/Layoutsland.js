import { Link, useLocation } from "react-router-dom";
import React from 'react';

import Header from "./includes/Header";
import Main from "./includes/Main";
import Footer from "./includes/Footer";
import Demo from "./includes/Demo";
import Blog from "./includes/Blog";

function Layoutsland() {

    const { pathname } = useLocation();

    return (
        <>
            <Header />
            {pathname == "" || pathname == "/" && <Main />}
            {pathname == "/Religio/Blog" && <Blog />}
            {pathname == "/Religio/Demo" && <Demo />}
            <Footer />
        </>
    );
}

export default Layoutsland;