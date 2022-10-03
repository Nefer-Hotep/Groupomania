import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Log/Logout";

const Navbar = () => {
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <Link to='/'>
                        <img
                            src='./img/icon-left-font-monochrome-white.svg'
                            alt=''
                        />
                    </Link>
                </div>
                <Logout />
            </div>
        </nav>
    );
};

export default Navbar;
