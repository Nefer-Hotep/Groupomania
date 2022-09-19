import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react';

const Thread= () => {
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
        <div className="thread">
            {postList.map((post) => {
                return (
                    <ul key={post.postId} className="card-container">
                        <li  className="postCard">
                            <h2>{post.postId}</h2>
                            <p>{post.message}</p>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
};

export default Thread;