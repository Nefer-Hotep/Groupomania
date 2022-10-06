import React from "react";
import { useUser } from "../context/UserContext";
import Logout from "./Log/Logout";

const Navbar = () => {
    const userId = useUser();
    
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <img
                        src='./img/icon-left-font-monochrome-white.svg'
                        alt='Logo de groupomania'
                    />
                </div>
                {userId ? <Logout /> : null}
            </div>
        </nav>
    );
};

export default Navbar;
