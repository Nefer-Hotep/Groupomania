import axios from "axios";
import React from "react";

const DeleteCard = ({ post, setPostUpdate }) => {
    const token = localStorage.getItem("groupomania.jwt.token");

    const deletePost = () => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                setPostUpdate(res.data);
                console.log("Post supprimé !");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <button className="icon-container"
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce post ?")) {
                    deletePost();
                }
            }}
        >
            <img src='./img/icons/trash.svg' alt='Icône de suppression' />
        </button>
    );
};

export default DeleteCard;
