import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Card from "./Post/Card";

const Thread = ({ createPost }) => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [postList, setPostList] = useState([]);
    const [postUpdate, setPostUpdate] = useState()

    console.log(postUpdate);

    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                // console.log(res.data);
                setPostList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [createPost, postUpdate]);

    return (
        <ul className='thread'>
            {postList.map((post) => {
                return <Card post={post} setPostUpdate={setPostUpdate} key={post.id} />;
            })}
        </ul>
    );
};

export default Thread;
