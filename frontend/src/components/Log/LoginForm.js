import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        }).then((res) => {
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = "/"
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
                type="text"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default LoginForm;
