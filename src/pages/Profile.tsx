import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CSS/Profile.css'
import { defaultImgs } from "../defaultimgs";
import Moralis from "moralis";
import { motion } from 'framer-motion';
// import Feed from "../components/Feed";
import Post from "../content/Post";
import Posts from "../content/Posts"
import { ClipLoader } from "react-spinners";
import { useMoralis, useMoralisCloudFunction, useMoralisWeb3Api, useMoralisQuery } from "react-moralis";
import { Back, Discord, Reddit, Save, Twitter } from "styled-icons/bootstrap";
import { Cancel, Settings } from "styled-icons/material";
import { Sitemap } from "styled-icons/boxicons-regular";

function Profile({post}) {
    const { Moralis, account, user } = useMoralis();
    //For rendering
    const [loading, setLoading] = useState(true);
    const [banner, setBanner] = useState(defaultImgs[1]);
    const [pfp, setPfp] = useState(defaultImgs[0]);
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [fullAddress, setFullAddress] = useState('0x000000000000')
    const [discord, setDiscord] = useState('')
    const [twitter, setTwitter] = useState('')
    const [website, setWebsite] = useState('')

    //For edit mode
    const [editMode, setEditMode] = useState(false);
    const [pfps, setPfps] = useState([]);
    const [selectedPFP, setSelectedPFP] = useState();
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(user.attributes.banner);
    const [theFile, setTheFile] = useState();
    const [newUsername, setNewUsername] = useState();
    const [newBio, setNewBio] = useState();
    const {fetch} = useMoralisCloudFunction('getUser', {address: window.location.href.split('/')[4]})

    const Web3Api = useMoralisWeb3Api();

    const navigate = useNavigate();

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
      };

    useEffect(() => {
    setLoading(true);
      RenderPage();
    }, [])

    useEffect(() => {

        async function fetchNFTs() {
          const options = {
            chain: 'eth'
          }
          const NFTs = await Web3Api.account.getNFTs(options);
          let images = [];
          NFTs.result.map(
            (e) => {
              images.push(resolveLink(JSON.parse(e.metadata)?.image) ? resolveLink(JSON.parse(e.metadata)?.image) : console.log('image error'))
            }
          );
          images.push(defaultImgs[0])
          setPfps(images);
        }
    
        fetchNFTs();
    
      },[])

      const onBannerClick = () => {
        inputFile.current.click();
      };
    
      const changeHandler = (event) => {
        const img = event.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
      };
    
      const saveEdits = async () => {
        const User = await Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();
    
        if (bio) {
          myDetails.set("bio", bio)
        }

        if (twitter) {
          myDetails.set('twitter', twitter)
        }

        if (website) {
          myDetails.set('website', website)
        }

        if (discord) {
          myDetails.set('discord', discord)
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
        setEditMode(false)
        window.location.reload();
      }

    async function RenderPage(){
        const fetchedUser = await fetch();
        setAddress(fetchedUser.attributes?.ethAddress)
        setFullAddress(fetchedUser.attributes.ethAddress);
        setUsername(fetchedUser.attributes?.username?.slice(0, 6))
        setPfp(fetchedUser.attributes.pfp ? fetchedUser.attributes.pfp : defaultImgs[0])
        setBanner(fetchedUser.attributes.banner ? fetchedUser.attributes.banner : defaultImgs[1])
        setBio(fetchedUser.attributes?.bio)
        setDiscord(fetchedUser.attributes?.discord);
        setTwitter(fetchedUser.attributes?.twitter);
        setWebsite(fetchedUser.attributes?.website);
        setLoading(false);
        setSelectedPFP(fetchedUser.attributes.pfp ? fetchedUser.attributes.pfp : defaultImgs[0]);
    }

    function onProfileClick(){
        const modal = document.getElementById('profileModal');
        modal.classList.remove('invisible');
        const page = document.getElementById('profilePage')
        page.classList.add('blur-md')
    }

    function onProfileClose(){
        const modal = document.getElementById('profileModal');
        modal.classList.add('invisible');
        const page = document.getElementById('profilePage')
        page.classList.remove('blur-md')
    }

    useEffect(() => {
        if (editMode == true){
        const bioInput = document.getElementById('bioInput');
        bioInput.value = bio ? bio : '';
        const usernameInput = document.getElementById('usernameInput');
        usernameInput.value = username;    
        twitterInput.value = twitter ? twitter : '';
        websiteInput.value = website ? website : '';   
        discordInput.value = discord ? discord : '';    
    }
    }, [editMode])
    
    const { data } = useMoralisQuery("BlockchainInfo", (query) => query.equalTo("postOwner", user.attributes.ethAddress), [], { live: true });
    const fetchedPosts = JSON.parse(JSON.stringify(data, ["postId", "contentId", "postOwner"])).reverse();

    return (
        <>
        <div id='profilePage'>
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
            <div>
            <img className={editMode ? "profileBanner rounded-md cursor-pointer brightness-75 outline-dotted outline-1 outline-white" : "profileBanner rounded-md"} onClick={editMode ? onBannerClick : () => {}} src={editMode ? selectedFile : banner} />
            {editMode && <input
              type="file"
              name="banner"
              ref={inputFile}
              accept='image/jpeg image/png'
              onChange={changeHandler}
              style={{ display: "none" }}
            />}
            <motion.button whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='tracking-widest bg-[#202020] rounded-md outline outline-4 outline-[#343536] py-3 px-5 align-middle justify-center absolute top-10 ml-5 shadow-xl'>
                    <Link to='/home' className="text-middle my-auto align-middle flex flex-row space-x-3 text-white ">
                        <Back className="w-7 h-7 flex-none my-auto text-white" />
                        <p className="my-auto text-xl text-white">
                            Back
                        </p>
                    </Link>
                </motion.button>
            </div>
            <div className="px-5">
                {editMode ? 
                <div className="profilePFP w-[130px] h-[130px]">
                <img className=" brightness-75 outline-dotted outline-[#343536] rounded-full absolute" src={editMode ? selectedPFP : pfp} />
                <button className="cursor-pointer w-full h-full absolute" onClick={onProfileClick} id='pfpButton'/> 
                </div>
                : 

                <img className="profilePFP" src={pfp} />}
                <div className="profileName">{editMode ? <input placeholder='Username' className='bg-transparent rounded-md outline outline-2 outline-[#343536] p-2' onChange={(e)=> setUsername(e.target.value)} id='usernameInput'/> : username}</div>
                <div className="profileWallet">{address}</div>
                <div className="flex flex-row space-x-10 mb-6 ml-8">
                { editMode ? 
                   <div className="flex flex-row space-x-3">
                     <Sitemap className="w-7" /><input placeholder="Website" className="bg-transparent outline-none p-2" onChange={(e) => setWebsite(e.target.value)} id='websiteInput'/>
                     </div> : 
                     (website ? <div className="flex flex-row space-x-3">
                    <a href={website.startsWith('http://') || website.startsWith('https://') ? website : 'http://' + website} className='my-auto' target='_blank'><Sitemap className="w-7" /></a><p className="my-auto text-md">{website}</p>
                   </div> : <></> )
                   }
                  { editMode ? 
                   <div className="flex flex-row space-x-3">
                   <Discord className="w-7" /><input placeholder="Discord User ID" className="bg-transparent outline-none p-2" onChange={(e) => setDiscord(e.target.value)} id='discordInput'/>
                   </div> : discord ? <div className="flex flex-row space-x-3">
                    <a href={'https://discordapp.com/users/' + discord} className='my-auto' target='_blank'><Discord className="w-7" /></a><p className="my-auto text-md">{discord}</p>
                   </div> : <></>}                   { editMode ? 
                   <div className="flex flex-row space-x-3">
                   <Twitter className="w-7" /><input placeholder="Twitter Handle" className="bg-transparent outline-none p-2" onChange={(e) => setTwitter(e.target.value)} id='twitterInput'/ >
                   </div> : twitter ? <div className="flex flex-row space-x-3">
                    <a href={'https://twitter.com/' + twitter} className='my-auto' target='_blank'><Twitter className="w-7" /></a><p className="my-auto text-md">{twitter}</p>
                   </div> : <></>}
                   
                  </div>
                <div className="profileBio mt-20 w-[1000px]">{ 
                editMode 

                ? 
                    <textarea placeholder='About Me' className='bg-transparent rounded-md outline outline-2 outline-[#343536] p-2 w-full resize-none h-[200px]' onChange={(e)=> setBio(e.target.value)} id='bioInput'/>
                :
                 bio ? bio : 'I haven\'t set my bio yet!'}</div>
                 
                <div className="flex flex-col place-items-start p-4 ml-5">
                {user.attributes.ethAddress == fullAddress ?
                 editMode ? <motion.button whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='tracking-widest bg-[#202020] rounded-md outline outline-1 outline-[#343536]'>
                 <button onClick={() => saveEdits() } className="flex flex-row space-x-3 align-middle text-white my-auto w-full py-3 px-5">
                 <Save className="w-7 h-7 flex-none my-auto text-white" />
                 <p className="text-white text-xl my-auto">
                     Save Changes
                 </p>
                 </button>
             </motion.button>
             :
             <motion.button whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='tracking-widest bg-[#202020] rounded-md outline outline-1 outline-[#343536]'>
                    <button onClick={() => setEditMode(true)} className="flex flex-row space-x-3 align-middle text-white my-auto w-full py-3 px-5">
                    <Settings className="w-7 h-7 flex-none my-auto text-white" />
                    <p className="text-white text-xl my-auto">
                        Edit Profile
                    </p>
                    </button>
                </motion.button>
                : <></>}
                {editMode ? <motion.button whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='tracking-widest bg-[#202020] mt-5 rounded-md outline outline-1 outline-[#343536]'>
                 <button onClick={() => setEditMode(false) } className="flex flex-row space-x-3 align-middle text-white my-auto w-full py-3 px-5">
                 <Cancel className="w-7 h-7 flex-none my-auto text-white" />
                 <p className="text-white text-xl my-auto">
                     Cancel
                 </p>
                 </button>
             </motion.button> : <></>}
                &nbsp;
                </div>
                <div className="profileTabs">
                    <div className="profileTab">
                    Your Posts
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                  <Post post={fetchedPosts} profile={true}/>
            </div>
        </div>
        </div>)}
        </div>
            <div className="bg-[#202020] rounded-md outline outline-1 outline-[#343536] top-1/4 left-1/4 fixed p-5 invisible flex flex-col" id='profileModal'>
              <span className="text-xl mb-5">My NFTs</span>
                  <div className="grid grid-cols-6 space-x-3">
                    
                  {pfps.map((e,i) => {
                    if (e){
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
                    }
              
            })}
            </div>
            <button className="bg-[#202020] rounded-md outline outline-1 outline-[#343536] w-20 h-12 self-end text-xl" onClick={onProfileClose}>Save</button>
            </div>
        </>
    )
}

export default Profile;