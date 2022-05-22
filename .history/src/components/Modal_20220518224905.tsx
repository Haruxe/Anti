import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion';
import { Plus, X, Image } from 'styled-icons/bootstrap';
import {message} from "antd";
// import { PolygonLogo } from './Chains/Logos';
import './CSS/Modal.css'
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
// import Moralis from 'moralis';


function Modal() {
    
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();
    const {contractABI, contractAddress, selectedCategory} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI);
    const ipfsProcessor = useMoralisFile();
    const contractProcessor = useWeb3ExecuteFunction();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [theFile, setTheFile] = useState('');
    const [post, setPost] = useState('');

    function ClosePost() {
        // @dev de-blurs the page
        const blurRoot = document.getElementById('page');
        blurRoot?.classList.remove('blur-md')
        // @dev deletes modal
        const modal = document.getElementById('modal')?.lastChild;
        modal.remove();
        window.location.reload()
    }

    async function addPostToBlockchain(post) {

        await Moralis.enableWeb3();
        const contentUri = await processContent(post);
        const categoryId = selectedCategory["categoryId"];
        const options = {
            contractAddress: contractAddress,
            functionName: "createPost",
            abi: contractABIJson,
            params: {
                _parentId: "0xc5bd07976cb0704ae6be0eaee9652ee37944bd01ab4b2f552b47b8cbee456225", // Need to still understand better how this works with the childId for the comments
                _contentUri: contentUri,
                _categoryId: categoryId
            },
        }
        console.log(options)
        await contractProcessor.fetch({params:options,
            onSuccess: () => message.success("success"),
            onError: (error) => message.error(error),
        });
        debugger
        postMessage();
    }

    const processContent = async (content) => {
        
        // if (theFile) {
        //     const data = theFile;
        //     const file = new Moralis.File(data.name, data);
        //     await file.saveIPFS();
        // }

        const ipfsResult = await ipfsProcessor.saveFile(
            "post.json",
            { base64: btoa(JSON.stringify(content)) },
            { saveIPFS: true}
        )
        return ipfsResult._ipfs;
    }

    // function Tag(props){
    //     return(
    //         <motion.div className='bg-[#1A1A1B] outline outline-1 flex shadow-lg space-x-1 flex-row align-middle outline-[#343536] rounded-2xl px-4 py-2 cursor-pointer' whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}}>
    //             <button>
    //                 <Plus className='w-5 my-auto'/>
    //             </button>
    //             <h1 className='my-auto text-white text-lg'>
    //                 {props.name}
    //             </h1>
    //         </motion.div>
    //     )
    // }

    // const Tags = () => {
    //     return(
    //         <div className='flex flex-row space-x-5'>
    //             <Tag name='Defi' />
    //             <Tag name='NFTs' />
    //             <Tag name='DAOs' />
    //             <Tag name='Metaverse' />
    //         </div>
    //     )
    // }

    async function postMessage() {

        const metadata = {
            'title': document.getElementById('postTitle').value,
            'content': document.getElementById('postContent').value,
            'Url': document.getElementById('postUrl').value,
            'Image': document.getElementById('postImg').value,
        };

        const metadataFile = new Moralis.File('metadata.json', { base64: btoa(JSON.stringify(metadata))});
        console.log(metadataFile)
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

        await newPost.save({ipfs_url: metadataFile, 'account': user});
        ClosePost();
    }

    const onImageClick = () => {
        inputFile.current.click();
    };
    
    const changeHandler = (e) => {
        const img = e.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };

    // const clearForm = () =>{
    //     setTitle();
    //     setContent();
    //     setUrl();
    // }

    function onSubmit(e){

        const metadata = {
            'title': document.getElementById('postTitle').value,
            'content': document.getElementById('postContent').value,
            'url': document.getElementById('postUrl').value,
            'category': document.getElementById('postCategory').value,
            'image': document.getElementById('postImg').value
        };

        e.preventDefault();
        // if(!validateForm()){
        //     return message.error("Remember to add the title and the content of your post")
        // }
        addPostToBlockchain(metadata)
        // clearForm();
    }

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
                    <input className='mx-auto w-full outline outline-1 outline-[#343536] resize-none bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Project Name' id='postTitle' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Tell us about your project!' id='postContent' value={content} onChange={(e) => setContent(e.target.value)}/>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Project Url link' id='postUrl' value={url} onChange={(e) => setUrl(e.target.value)}/>
                    <div>
                        <select id='postCategory' placeholder="Choose a category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option className="text-black" value='Choose a category'>Choose a category</option>
                            <option value="Defi">Defi</option>
                            <option value="NFTs">NFTs</option>
                            <option value="DAOs">DAOs</option>
                            <option value="Metaverse">Metaverse</option>
                        </select>
                    </div>
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
                            id='postImg'
                        />
                        <Image className='w-10 self-end'/>
                    </div>
                    {/* <Tags /> */}
                    <motion.button className='px-6 py-3 bg-white text-black self-end rounded-sm outline outline-1 outline-[#343536]' onClick={postMessage}>
                        Post
                    </motion.button>
                    <motion.button className='px-6 py-3 bg-white text-black self-end rounded-sm outline outline-1 outline-[#343536]' onClick={onSubmit}>
                        Post on Blockchain
                    </motion.button>
                </div>
            </div>
        </motion.div>  
    )
}

export default Modal