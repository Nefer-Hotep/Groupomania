import React, { useState, useEffect } from "react";
import axios from "axios";


const Card = ({ post }) => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [userPost, setUserPost] = useState()
    const [isUpdated, setIsUpdated] = useState(true);
    const [textUpdate, setTextUpdate] = useState(null);

    const updateItem = () => {
        // console.log("Modifie le post !");
        axios
                .put(`${process.env.REACT_APP_API_URL}api/post/${post.id}`, {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
    };


    return (
        <li key={post.id} className='card-container'>
            <h2>{post.userId}</h2>
            <img
                src={`${process.env.REACT_APP_API_URL}${post.image}`}
                alt={`Post de ${post.id}`}
            />
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
                <div className='update-post'>
                    <textarea
                        defaultValue={post.message}
                        onChange={(e) => setTextUpdate(e.target.value)}
                    />
                    <div className='button-container'>
                        <button className='btn' onClick={updateItem}>
                            Valider modification
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default Card;
