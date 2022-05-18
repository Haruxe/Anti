import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion';
import { Plus, X, Image } from 'styled-icons/bootstrap';
import Moralis from "moralis"
// import { PolygonLogo } from './Chains/Logos';
import './CSS/Modal.css'
import { useMoralis, useWeb3ExecuteFunction, useMoralisQuery} from 'react-moralis';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';

function Modal() {

    const user = Moralis.User.current();
    const queryCategories = useMoralisQuery("Categories");
    const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]));
    console.log(fetchedCategories)
    // const contractProcessor = useWeb3ExecuteFunction();

    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [theFile, setTheFile] = useState();
    const [post, setPost] = useState();

    function ClosePost() {
        // @dev de-blurs the page
        const blurRoot = document.getElementById('page');
        blurRoot?.classList.remove('blur-md')
        // @dev deletes modal
        const modal = document.getElementById('modal')?.lastChild;
        modal.remove();
        window.location.reload()
    }

    function Tag(props){
        return(
            <motion.div className='bg-[#1A1A1B] outline outline-1 flex shadow-lg space-x-1 flex-row align-middle outline-[#343536] rounded-2xl px-4 py-2 cursor-pointer' whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}}>
                <button>
                    <Plus className='w-5 my-auto'/>
                </button>
                <h1 className='my-auto text-white text-lg'>
                    {props.name}
                </h1>
            </motion.div>
        )
    }

    const Tags = () => {
        return(
            <div className='flex flex-row space-x-5'>
                <Tag categories={fetchedCategories}/>
            </div>
        )
    }

    async function postMessage() {

        const metadata = {
            'title': document.getElementById('postTitle').value,
            'content': document.getElementById('postContent').value,
            'Url': document.getElementById('postUrl').value,
            'Image': document.getElementById('postImage').value,
            'comments': 'none',
            'upvotes': 0,
            'downvotes': 0,
            'uploadDate': Date.now
        };

        const metadataFile = new Moralis.File('metadata.json', { base64: btoa(JSON.stringify(metadata))});
        console.log(metadataFile)
        debugger
        await metadataFile.saveIPFS();

        const Post = Moralis.Object.extend("Posts");
        const newPost = new Post();
        newPost.set("postTitle", document.getElementById('postTitle').value)
        newPost.set("postContent", document.getElementById('postContent').value)
        newPost.set("postUrl", document.getElementById('postUrl').value)
        newPost.set("postPfp", user.attributes.pfp);
        newPost.set("postAcc", user.attributes.ethAddress);
        newPost.set("postUserName", user.attributes.username);

        if (theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            newPost.set("postImg", file.ipfs());
        }

        await newPost.save({ipfs_url: metadataFile, 'account': Moralis.User.current});
        ClosePost();
    }

    const onImageClick = () => {
        inputFile.current.click();
    };
    
    const changeHandler = (event) => {
        const img = event.target.files[0];
        setSelectedFile(URL.createObjectURL(img));
    };

  return (
        <motion.div className='h-full w-full align-middle justify-center ' animate={{scale: 1}} initial={{scale: 0}} exit={{scale: 0}}>
            <div className='flex justify-center h-screen'>
                <div className='bg-[#1A1A1B] w-[50rem] h-auto outline outline-1 outline-[#343536] flex flex-col space-y-10 p-8 m-auto rounded-md justify-self-center self-center'>
                    <div className='flex'>
                        <h1 className='align-middle my-auto text-white text-lg'>
                        New Post
                        </h1>
                        <motion.button className='self-end ml-auto' onClick={ClosePost} whileHover={{scale: 1.05}}>
                            <X className='w-10 self-end' />
                        </motion.button>
                    </div>
                    <input className='mx-auto w-full outline outline-1 outline-[#343536] resize-none bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Project Name' id='postTitle'/>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Tell us about your project!' id='postContent'/>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Project Url link' id='postUrl'/>
                    {selectedFile && (
                    <img src={selectedFile} className="postImg"></img>
                    )}
                    <div className="imgDiv" onClick={onImageClick}>
                        <input
                            type="file"
                            name="file"
                            ref={inputFile}
                            onChange={changeHandler}
                            style={{ display: "none"}}
                        />
                        <Image className='w-10 self-end'/>

                    </div>
                    <Tags />
                    <motion.button className='px-6 py-3 bg-white text-black self-end rounded-sm outline outline-1 outline-[#343536]' onClick={postMessage}>
                        Post
                    </motion.button>
                </div>
             </div>
        </motion.div>  
    )
}

export default Modal