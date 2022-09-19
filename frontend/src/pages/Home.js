import React from "react";
import Thread from "../components/Thread";
import CreatePost from "../components/Post/CreatePost";

const Home = () => {
    return (
        <main className='home'>
            <CreatePost />
            <Thread />
        </main>
    );
};

export default Home;
