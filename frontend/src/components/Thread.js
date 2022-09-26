import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Card from "./Post/Card";

const Thread = () => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`, {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setPostList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <ul className='thread'>
            {postList.map((post) => {
                return <Card post={post} key={post.id} />;
            })}
        </ul>
    );
};

export default Thread;