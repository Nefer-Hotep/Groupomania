import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const LikeButton = ({ post, setPostUpdate }) => {
    const token = localStorage.getItem("groupomania.jwt.token");
    const [liked, setLiked] = useState(false);

    const uId = useUser();
    const postId = post.id;

    const like = () => {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                setPostUpdate(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (post.likes.find(obj => {
            return obj.userId === uId;
          })) setLiked(true);
          
        else setLiked(false);
    }, [uId, post, liked]);

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
