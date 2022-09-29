import React, { useState } from "react";
import axios from "axios";

const Card = ({ post }) => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(post.message);
    const [imageFile, setImageFile] = useState();
    // const [imageUrl, setImageUrl] = useState();

    const updateItem = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("message", textUpdate);

        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
            data: formData,
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

    const handlePicture = (e) => {
        // setImageUrl(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    };

    const setEditMod = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post/getUserPosts`,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.data[0].id === post.userId) {
                    setIsUpdated(true);
                } else {
                    console.log("Action non autorisé !");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <li
            key={post.id}
            className='card-container'
            onDoubleClick={() => setEditMod()}
        >
            <h2>{post.userId}</h2>

            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_API_URL}${post.image}`}
                    alt={`Post de ${post.id}`}
                />
            ) : null}

            {isUpdated === false && <p>{post.message}</p>}

            {isUpdated && (
                <div className='update-post'>
                    <textarea
                        defaultValue={post.message}
                        onChange={(e) => setTextUpdate(e.target.value)}
                    />
                    <input
                        type='file'
                        id='file-upload'
                        name='image'
                        accept='.jpg, .jpeg, .png'
                        onChange={(e) => handlePicture(e)}
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
