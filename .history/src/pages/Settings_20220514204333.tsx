import React from 'react'
import './CSS/Settings.css'
import { useState, useRef } from "react";
import { Input } from "antd";
import pfp1 from "../images/pfp1.png";
import pfp2 from "../images/pfp2.png";
import pfp3 from "../images/pfp3.png";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import { defaultImgs } from "../defaultimgs";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

const Settings = () => {

 
  const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5];

  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const { Moralis } = useMoralis();
  Moralis.start({serverUrl, appId})

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (bio) {
      myDetails.set("bio", bio)
    }

    if (username) {
      myDetails.set("username", username)
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.saveIPFS());
    }

    await myDetails.save();
    window.location.reload();
  }

  return (
    <>
      <h1 className="text-white">Profile Settings</h1>
      <div className="settingsPage">
        <Input
          placeholder="Name"
          autosize={true}
          onChange={(e)=> setUsername(e.target.value)}
        />

        <Input
          placeholder="Bio"
          onChange={(e)=> setBio(e.target.value)}
        />
      </div>

      <div className="pfp">
          Profile Image (Your NFTs)

          <div className="pfpOptions">
            {pfps.map((e,i) => {

              return(
                <>
                <img
                src={e}
                className={
                  selectedPFP === e ? "pfpOptionSelected" : "pfpOption"
                }
                onClick={() => {setSelectedPFP(pfps[i]);}}
                ></img>
                </>
              )
            })}
          </div>

          <div className="pfp">
          Profile Banner
          <div className="pfpOptions">
            <img
              src={selectedFile}
              onClick={onBannerClick}
              className="banner"
            ></img>
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        &nbsp;
        <div className="save" 
        onClick={() => saveEdits()}
        >
          Save
        </div>
        &nbsp;
        <motion.div className='tracking-widest mx-auto' whileHover={{scale: 1}}>
          <Link to='/Home'>
          <div className="home">
              Home
          </div>
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default Settings
