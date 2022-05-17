import React from 'react'
import './CSS/Settings.css'
import { useState, useRef, useEffect} from "react";
import { Input } from "antd";
// import pfp1 from "../images/pfp1.png";
// import pfp2 from "../images/pfp2.png";
// import pfp3 from "../images/pfp3.png";
// import pfp4 from "../images/pfp4.png";
// import pfp5 from "../images/pfp5.png";
import { defaultImgs } from "../defaultimgs";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Settings = () => {

  // const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const [pfps, setPfps] = useState([]);
  const [selectedPFP, setSelectedPFP] = useState();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  useEffect(() => {

    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address: account
      }

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      const images = mumbaiNFTs.result.map(
        (e) => resolveLink(JSON.parse(e.metadata)?.image)
      );
      setPfps(images);
    }

    fetchNFTs();

  },[isAuthenticated, account])

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

    if (selectedPFP){
      myDetails.set("pfp", selectedPFP);
    }

    if (username) {
      myDetails.set("username", username)
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    await myDetails.save();
    window.location.reload();
  }

  return (
    <div className='w-full h-screen justify-center'>
    <div className='p-5 w-[1300px] mx-auto bg-[#202020] outline-1 outline outline-[#343536] h-full'>
      <h1 className="text-white text-2xl tracking-wide">Profile Settings</h1>
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
      <div className="pfp text-2xl tracking-wide">
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

          <div className="pfp text-white">
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
        <div className='flex place-content-end mt-5'>
        <div className='flex flex-col space-y-4 w-[200px] '>
          <motion.button onClick={() => saveEdits()} className='bg-blue-300 rounded-md p-5 text-black align-center'>
            <p className='my-auto text-2xl tracking-wide'>
            Save
            </p>
          </motion.button >
          <button className='bg-blue-300 rounded-md p-5 text-black align-center'>
          <Link to='/Home'>
          <p className='my-auto text-2xl tracking-wide text-black'>
              Home
          </p>
          </Link>
          </button>
        </div>
        </div>
        &nbsp;
      </div>
    </div>
    </div>
  )
}

export default Settings
