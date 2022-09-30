import React from "react";
import { useState } from "react";
import axios from "axios";

const UpdatePost = ({ post, setPostUpdate }) => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(post.message);
    const [imageFile, setImageFile] = useState();

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
                // console.log(res.data);
                setPostUpdate(res.data);
                setIsUpdated(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cancelUpdate = () => {
        setIsUpdated(false);
        setTextUpdate(post.message);
        setImageFile();
    };

    const handlePicture = (e) => {
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
        <div>
            <div className="button-container" onClick={() => setEditMod()}>
                <img src='./img/icons/edit.svg' alt='Icone de modification' />
            </div>
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
                        <button className='btn' onClick={cancelUpdate}>
                            Annuler modification
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdatePost;
