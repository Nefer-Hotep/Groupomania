import React from "react";

const Logout = () => {
    const logout = () => {
        localStorage.removeItem("groupomania.jwt.token");
        window.location = "/";
    };

    return (
        <button className='logout-button' onClick={logout}>
            <img src='./img/icons/logout.svg' alt='Icône de déconnexion' />
        </button>
    );
};

export default Logout;
