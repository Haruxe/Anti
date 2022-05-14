import React from "react";
import { Routes, Route } from "react-router-dom";
import '../index.css';
import Feed from '../components/Feed';
import FeedTitle from '../content/FeedTitle';
import AddPost from '../components/AddPost';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Settings from '../components/Settings';

function Home() {
  return (
    <div className='flex justify-center space-x-4 px-4'>
        <div className='mt-5'>
            <AddPost />
        </div>
        <div className='bg-[#202020] outline outline-1 outline-[#343536] w-[1300px] mb-10 h-auto rounded-sm flex justify-center flex-row'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Feed />} />
            </Routes>
        </div>
    </div>
  )
}

export default Home