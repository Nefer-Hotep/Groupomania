import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUpdateUser() {
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
    const token = localStorage.getItem("groupomania.jwt.token");
    const [userContext, setUserContext] = useState();
    
    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post/getUserPosts`,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                setUserContext(res.data[0].id);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <UserContext.Provider value={userContext}>
            <UserUpdateContext.Provider value={setUserContext}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}
