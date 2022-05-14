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

const Settings = () => {

  const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5];

    // const [pfps, setPfps] = useState([]);
    // const [selectedPFP, setSelectedPFP] = useState();
    // const inputFile = useRef(null);
    // const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
    // const [theFile, setTheFile] = useState();
    // const [username, setUsername] = useState();
    // const [bio, setBio] = useState();
    // const { Moralis, isAuthenticated, account } = useMoralis();
    // const Web3Api = useMoralisWeb3Api();

    // const resolveLink = (url) => {
    //     if (!url || !url.includes("ipfs://")) return url;
    //     return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    // };

    // useEffect(() => {

    //     const fetchNFTs = async () => {
    //       const options = {
    //         chain: "rinkeby",
    //         address: account
    //       }
    
    //       const mumbaiNFTs = await Web3Api.account.getNFTs(options);
    //       const images = mumbaiNFTs.result.map(
    //         (e) => resolveLink(JSON.parse(e.metadata)?.image)
    //       );
    //       setPfps(images);
    //     }
    
    //     fetchNFTs();
    
    //   },[isAuthenticated, account])

  return (
    <>
      <div className="pageIdentify">Settings</div>
      <div className="settingsPage">
        <Input
          placeholder="Name"
          // onChange={(e)=> setUsername(e.target.value)}
        />

        <Input
          placeholder="Bio"
          // onChange={(e)=> setBio(e.target.value)}
        />
      </div>
    </>
  )
}

export default Settings
