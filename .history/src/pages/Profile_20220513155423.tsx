import React from "react";
import { Link } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis";
import { Moralis } from 'moralis';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
Moralis.start({ SERVER_URL, APP_ID})

const Profile = () => {

    const { Moralis } = useMoralis();
    const user = Moralis.User.current();

    return (
        <>
        <div className="pageIdentify">Profile</div>
        <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}></img>
        </>
    )
}

export default Profile;