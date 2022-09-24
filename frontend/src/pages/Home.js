import React from "react";
import Thread from "../components/Thread";
import PostForm from "../components/Post/PostForm";

const Home = () => {
    return (
        <main className='home'>
            <PostForm />
            <Thread />
        </main>
    );
};

export default Home;
