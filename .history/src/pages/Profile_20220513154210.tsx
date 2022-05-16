import React from "react";
import { Link } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis";

const Profile = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();

    return (
        <>
        <h1 className="text-white">Hi!</h1>
        </>
    )
}

export default Profile;