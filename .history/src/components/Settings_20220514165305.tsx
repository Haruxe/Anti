import React from 'react'
import './CSS/Settings.css'
import { useState, useRef, useEffect } from "react";
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

const Settings = () => {

  const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5];

  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <h1 className="text-white">Profile Settings</h1>
      <div className="settingsPage">
        <Input
          placeholder="Name"
          autosize={true}
          // onChange={(e)=> setUsername(e.target.value)}
        />

        <Input
          placeholder="Bio"
          // onChange={(e)=> setBio(e.target.value)}
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
        // onClick={() => saveEdits()}
        >
          Save
        </div>
        <motion.button className='tracking-widest mx-auto' whileHover={{scale: 1}}>
                    <Link to='/Home'>
                    <div className='profileEdit'>
                        Home
                    </div>
                    </Link>
                </motion.button>
      </div>
    </>
  )
}

export default Settings
