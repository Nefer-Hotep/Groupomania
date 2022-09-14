import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const Home = () => {
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
        <div>
            <h1>Hello depuis Home</h1>
            {postList.map((post) => {
                return (
                    <div key={post.postId}>
                        <h2>{post.postId}</h2>
                        <p>{post.message}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
