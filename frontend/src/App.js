import React from "react";
import { Routes, Route } from "react-router-dom";
import Log from "./pages/Log";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;