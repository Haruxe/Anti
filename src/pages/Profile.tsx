import React from "react";
import { Link } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import Moralis from "moralis";
import { motion } from 'framer-motion';
// import Feed from "../components/Feed";
import Post from "../content/Post";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Profile() {

    Moralis.start({serverUrl, appId})
    const user = Moralis.User.current();

    return (
        <div className="justify-center w-full">
        <div className="w-[1300px] mx-auto my-5">
            <img className="profileBanner rounded-md" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]} ></img>
            <div className="pfpContainer">
                <img className="profilePFP" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}></img>
                <div className="profileName">{user.attributes.username.slice(0, 6)}</div>
                <div className="profileWallet">{`${user.attributes.ethAddress.slice(0, 4)}...
                ${user.attributes.ethAddress.slice(38)}`}</div>
                
                <div className="profileBio">
                {user.attributes.bio}
                </div>

                <div className="flex flex-col place-items-start p-4">
                <motion.button className='tracking-widest'>
                    <Link to='/settings'>
                    <p>
                        Edit Profile
                    </p>
                    </Link>
                </motion.button>
                &nbsp;
                <motion.button className='tracking-widest'>
                    <Link to='/home'>
                    <p>
                        Home
                    </p>
                    </Link>
                &nbsp;
                </motion.button>
                </div>
                <div className="profileTabs">
                    <div className="profileTab">
                    Your Posts
                    </div>
                </div>
            </div>
            <Post profile={true} />
        </div>
        </div>
    )
}

export default Profile;