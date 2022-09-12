import React from "react";
import Log from "../components/Log/index";

const Profile = () => {
    return (
        <div className="profile-page">
            <img src="./img/pexels-fauxels-3184423.jpg" alt="" />
            <div className="log-container">
                <Log login={true} signup={false} />
            </div>
        </div>
    );
};

export default Profile;
