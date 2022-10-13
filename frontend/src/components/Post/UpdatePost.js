import React from "react";
import { useState } from "react";
import axios from "axios";
import DeleteCard from "./DeleteCard";

const UpdatePost = ({ post, setPostUpdate, setIsUpdated }) => {
    const token = localStorage.getItem("groupomania.jwt.token");

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

    return (
        <>
            <div className='update-post'>
                <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className='button-container'>
                    <button className='btn' onClick={updateItem}>
                        Valider
                    </button>
                    <button className='btn' onClick={cancelUpdate}>
                        Annuler
                    </button>
                </div>
                <div className='icon-container'>
                    <button className='picture-icon'>
                        <input
                            type='file'
                            id='file-upload'
                            name='image'
                            accept='.jpg, .jpeg, .png'
                            onChange={(e) => handlePicture(e)}
                        />
                        <img
                            for='file'
                            src='./img/icons/picture.svg'
                            alt="ajout d'un fichier"
                        />
                    </button>
                    <DeleteCard post={post} setPostUpdate={setPostUpdate} />
                </div>
            </div>
        </>
    );
};

export default UpdatePost;
