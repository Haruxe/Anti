import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import Moralis from "moralis";
import { motion } from 'framer-motion';
// import Feed from "../components/Feed";
import Post from "../content/Post";
import { ClipLoader } from "react-spinners";
import { useMoralisCloudFunction } from "react-moralis";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [banner, setBanner] = useState(defaultImgs[1]);
    const [pfp, setPfp] = useState(defaultImgs[0]);
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const { fetch } = useMoralisCloudFunction('getUser', {address: window.location.href.split('/')[4]})
 
    useEffect(() => {
    setLoading(true);
      RenderPage();
    }, [])

    async function RenderPage(){
        const user = await fetch();
        setAddress(user.attributes?.ethAddress.slice(0, 4) + '...' +
        user.attributes?.ethAddress.slice(38))
        setUsername(user.attributes?.username?.slice(0, 6))
        setPfp(user.attributes.pfp ? user.attributes.pfp : defaultImgs[0])
        setBanner(user.attributes.banner ? user.attributes.banner : defaultImgs[1])
        setBio(user.attributes?.bio)
        setLoading(false);
    }
    

    return (
        <>
        {loading ? 
      <div className="justify-center items-center flex text-center w-screen h-screen">
    <ClipLoader
    size={60}
    color={'#FFFFFF'}
    loading={loading}
    /> 
    </div> : (
        <div className="justify-center w-full">
        <div className="w-[1300px] mx-auto my-5">
            <img className="profileBanner rounded-md" src={banner} ></img>
            <div className="pfpContainer">
                <img className="profilePFP" src={pfp}></img>
                <div className="profileName">{username}</div>
                <div className="profileWallet">{address}</div>
                <div className="profileBio">{bio}</div>

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
        </div>)}
        </>
        )
        }

export default Profile;