import React from "react";
import { Link } from "react-router-dom";
import { useUpdateUser } from "../../context/UserContext";

const Logout = () => {
    const userLoged = useUpdateUser()

    const logout = () => {
        userLoged()
        localStorage.removeItem("groupomania.jwt.token");
    };

    return (
        <button className='logout-button' onClick={logout}>
            <Link to='/'>
                <img src='./img/icons/logout.svg' alt='Icône de déconnexion' />
            </Link>
        </button>
    );
};

export default Logout;
