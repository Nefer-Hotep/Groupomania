import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [message, setMessage] = useState("");

    const addPost = async (e) => {
        e.preventDefault();

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post`,
            headers: {
                Authorization: `bearer ${token}`,
            },
            data: {
                message,
            },
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='create-post'>
            <h1>Acceuil</h1>
            <textarea
                name='message'
                id='message'
                placeholder='Quoi de neuf ?'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            ></textarea>
            <div>
            <button className='send' onClick={addPost}>
                Envoyer
            </button>
            </div>
        </div>
    );
};

export default CreatePost;
