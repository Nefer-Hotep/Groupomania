import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser() {
    return useContext(UserContext)
}

export function useUpdateUser() {
    return useContext(UserUpdateContext)
}

export function UserProvider({ children }) {
    const [userContext, setUserContext] = useState();

    const toggleUser = () => {
        setUserContext();
    };

    console.log(userContext);
    return (
        <UserContext.Provider value={userContext}>
            <UserUpdateContext.Provider value={toggleUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}
