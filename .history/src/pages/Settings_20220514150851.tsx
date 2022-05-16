import React from 'react'
import './CSS/Settings.css'
import { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { defaultImgs } from "../defaultimgs";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const Settings = () => {

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
          label="Name"
          name="NameChange"
          width="100%"
          labelBgColor="#141d26"
          // onChange={(e)=> setUsername(e.target.value)}
        />

        <Input
          label="Bio"
          name="bioChange"
          width="100%"
          labelBgColor="#141d26"
          // onChange={(e)=> setBio(e.target.value)}
        />
      </div>
    </>
  )
}

export default Settings
