import React from "react";
import { Link } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis";

function Profile() {

    // const { Moralis } = useMoralis();
    const user = Moralis.User.current();

    return (
        <>
        <div className="pageIdentify">Profile</div>
        <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}></img>
        <div className="pfpContainer">
            <img className="profilePFP" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}></img>
        </div>
        </>
    )
}

export default Profile;