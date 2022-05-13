import React from "react";
import { Link } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Profile() {

    Moralis.start({serverUrl, appId})
    const user = Moralis.User.current();

    return (
        <>
        <div className="pageIdentify">Profile</div>
        <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}></img>
        <div className="pfpContainer">
            <img className="profilePFP" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}></img>
            <div className="profileName">{user.attributes.username.slice(0, 6)}</div>
            <div className="profileWallet">{`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}</div>
        </div>
        <Link to="/settings">
          <div className="profileEdit">Edit profile</div>
        </Link>
        </>
    )
}

export default Profile;