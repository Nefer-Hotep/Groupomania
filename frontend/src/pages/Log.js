import React from "react";
import Log from "../components/Log/index";

const Profile = () => {
    return (
        <div className="profile-page">
            <div className="log-container">
                <Log login={true} signup={false} />
            </div>
        </div>
    );
};

export default Profile;
