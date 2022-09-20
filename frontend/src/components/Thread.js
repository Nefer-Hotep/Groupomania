import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const Thread = () => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4200/api/post/", {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setPostList(res.data);
            })
            .catch();
    }, []);

    return (
        <ul className='thread'>
            {postList.map((post) => {
                return (
                    <li key={post.id} className='card-container'>
                        <h2>{post.id}</h2>
                        <img
                            src={`http://localhost:4200/${post.image}`}
                            alt={`Post de ${post.id}`}
                        />
                        <p>{post.message}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default Thread;
