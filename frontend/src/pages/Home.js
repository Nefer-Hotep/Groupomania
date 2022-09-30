import React, { useState } from "react";
import Thread from "../components/Thread";
import PostForm from "../components/Post/PostForm";

const Home = () => {

    const [createPost, setCreatePost] = useState({})

    return (
        <main className='home'>
            <PostForm setCreatePost={setCreatePost}/>
            <Thread createPost={createPost}/>
        </main>
    );
};

export default Home;
