import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <Link to="/">
                    <img src="./img/icon-left-font-monochrome-black.png" alt="" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
