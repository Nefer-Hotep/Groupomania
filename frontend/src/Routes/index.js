import React from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Connexion from "../pages/Connexion";
import Home from "../pages/Home";

const index = () => {
    return (
        <Router>
            <Route>
                <Route path="/" exact component={Connexion} />
                <Route path="/" exact component={Home} />
                <Navigate to="/" />
            </Route>
        </Router>
    );
};

export default index;
