import Routes from "./Routes"
import { useState } from "react";
import Axios from "axios";
import "./styles/App.css";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const addUsers = () => {
        Axios.post(`http://localhost:4200/signup`, {
            name,
            email,
            password,
        }).then(() => {
            console.log("success");
        });
    };

    return (
        <div className="App">
            <label htmlFor="">Nom : </label>
            <input
                type="text"
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <label htmlFor="">E-mail : </label>
            <input
                type="text"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <label htmlFor="">Mot-de-passe : </label>
            <input
                type="text"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button type="submit" onClick={addUsers}>
                Valider
            </button>
        </div>
    );
}

export default App;
