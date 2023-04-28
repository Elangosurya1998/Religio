import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {

    const { pathname, hash } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        scroltoSection(hash)
    }, [pathname]);

    scroltoSection(hash)

    return null;
}

function scroltoSection(hash) {
    switch (hash) {
        case "":
            window.scrollTo(0, 0);
            break;
        case "#Feature":
            window.scrollTo(0, 900);
            break;
        case "#Services":
            window.scrollTo(0, 1900);
            break;
        case "#Blog":
            window.scrollTo(0, 4700);
            break;
        default:
            break;
    }
}