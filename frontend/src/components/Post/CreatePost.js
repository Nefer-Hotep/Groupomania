import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

    // const handlePicture = (e) => {
    //     setPostImage(URL.createObjectURL(e.target.files[0]));
    //     setFile(e.target.files[0]);
    // };

    const createPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // userId n'est pa récupéré
        formData.append("userId", );
        formData.append("image", image);
        formData.append("message", message);

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post`,
            headers: {
                Authorization: `bearer ${token}`,
            },
            formData,
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='create-post'>
            <h1>Acceuil</h1>
            <form>
                <img src={image} alt='' />
                <input
                    type='text'
                    name='message'
                    id='message'
                    placeholder='Quoi de neuf ?'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <input
                    type='file'
                    id='file-upload'
                    name='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <input
                    type='submit'
                    value='Envoyer'
                    className='send'
                    onClick={createPost}
                />
            </form>
        </div>
    );
};

export default CreatePost;
