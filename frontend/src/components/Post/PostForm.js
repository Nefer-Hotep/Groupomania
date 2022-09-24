import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState();
    const [imageUrl, setImageUrl] = useState();

    const handlePicture = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    };

    const formData = new FormData();
    formData.append("image", imageFile)
    formData.append("message", message);

    const submitPost = async (e) => {
        e.preventDefault();

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post`,
            data : formData,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='create-post'>
            <h1>Acceuil</h1>
            <form onSubmit={submitPost} encType='multipart/form-data'>
                <img src={imageUrl} alt='' />
                <textarea
                    name='message'
                    id='message'
                    placeholder='Quoi de neuf ?'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <input
                    type='file'
                    id='file-upload'
                    name='image'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => handlePicture(e)}
                />
                <input type='submit' value='Envoyer' className='send' />
            </form>
        </div>
    );
};

export default CreatePost;
