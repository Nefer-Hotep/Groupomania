import React, { useState } from "react";
import axios from "axios";
import UpdatePost from "./UpdatePost";
import { useUser, useUpdateUser } from "../../context/UserContext";
import LikeButton from "./LikeButton";

const Card = ({ post, setPostUpdate }) => {
    const token = localStorage.getItem("groupomania.jwt.token");
    const [isUpdated, setIsUpdated] = useState(false);
    const [modifButton, setModifButton] = useState(false);

    const userContext = useUser()
    const toggleUser = useUpdateUser();


    axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/post/getUserPosts`,
        headers: {
            Authorization: `bearer ${token}`,
        },
    })
        .then((res) => {
            if (res.data[0].id === post.userId || res.data[0].admin === true) {
                setModifButton(true);
            } else {
                console.log("Modification non autorisé !");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <li key={post.id} className='card-container'>
            <div className='card-header'>
                <h2>{post.users.pseudo}</h2>
                {modifButton && (
                    <div className='modif-button'>
                        <button
                            className='icon-container'
                            onClick={() => setIsUpdated(true)}
                        >
                            <img
                                src='./img/icons/edit.svg'
                                alt='Icone de modification'
                            />
                        </button>
                    </div>
                )}
            </div>
            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_API_URL}${post.image}`}
                    alt={`Post de ${post.id}`}
                />
            ) : null}

            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
                <UpdatePost
                    post={post}
                    setPostUpdate={setPostUpdate}
                    setIsUpdated={setIsUpdated}
                />
            )}
            {console.log(userContext)}
            <LikeButton />
        </li>
    );
};

export default Card;
