import React from "react";
import UpdatePost from "./UpdatePost";

const Card = ({ post, setPostUpdate }) => {
    return (
        <li key={post.id} className='card-container'>
            <h2>{post.userId}</h2>

            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_API_URL}${post.image}`}
                    alt={`Post de ${post.id}`}
                />
            ) : null}

            <UpdatePost post={post} setPostUpdate={setPostUpdate} />
        </li>
    );
};

export default Card;
