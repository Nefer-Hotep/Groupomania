import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const LikeButton = ({ post }) => {
    const token = localStorage.getItem("groupomania.jwt.token");
    const [liked, setLiked] = useState();

    const userId = useUser();

    const like = () => {
        const postId = post.id;
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                console.log(userId);
                console.log(post);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (post.likes.includes(userId)) setLiked(true);
        else setLiked(false);
    }, [liked]);

    return (
        <>
            <div className='like-container'>
                {liked === false && (
                    <img
                        src='./img/icons/heart.svg'
                        alt='Boutton de like'
                        onClick={like}
                    />
                )}
                {liked === true && (
                    <img
                        src='./img/icons/heart-filled.svg'
                        alt='Boutton de disliked'
                        onClick={like}
                    />
                )}
                <span>{post.likes.length}</span>
            </div>
        </>
    );
};

export default LikeButton;
