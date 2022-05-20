import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion';
import { Plus, X, Image, PlusCircle } from 'styled-icons/bootstrap';
import {message} from "antd";
import './CSS/Modal.css'
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';


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
    // const [post, setPost] = useState('');

    function ClosePost() {
        // @dev de-blurs the page
        const blurRoot = document.getElementById('page');
        blurRoot?.classList.remove('blur-md')
        // @dev deletes modal
        const modal = document.getElementById('modal')?.lastChild;
        modal.remove();
        window.location.reload()
    }

    async function addPostToBlockchain() {

        const Post = Moralis.Object.extend("Posts");
        const newPost = new Post();
        newPost.set("postTitle", document.getElementById('postTitle').value)
        newPost.set("postContent", document.getElementById('postContent').value)
        newPost.set("postUrl", document.getElementById('postUrl').value)
        newPost.set("postCategory", document.getElementById('postCategory').value)
        newPost.set("postPfp", user.attributes.pfp);
        newPost.set("postAcc", user.attributes.ethAddress);
        newPost.set("postUserName", user.attributes.username);
        
        const data = theFile;
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();
        newPost.set("postImg", file.ipfs());

        const contentUri = await processContent(newPost);
        const categoryId = document.getElementById('postCategory').value;
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
        
        ClosePost();
    }

    const processContent = async (content) => {

        const ipfsResult = await ipfsProcessor.saveFile(
            "post.json",
            { base64: btoa(JSON.stringify(content)) },
            { saveIPFS: true}
        )
        return ipfsResult._ipfs;
    }

    const onImageClick = () => {
        inputFile.current.click();
    };
    
    const changeHandler = (e) => {
        const img = e.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };

  return (
        <motion.div className='h-full w-full align-middle justify-center' animate={{scale: 1}} initial={{scale: 0}} exit={{scale: 0}}>
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
                    <input className='mx-auto w-full resize-none text-white bg-transparent outline-none text-xl p-3' placeholder='Project Name' id='postTitle' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea className='mx-auto w-full h-[200px]  outline-[#343536] bg-[#181818] outline outline-1 p-3 resize-none ' placeholder='Body' id='postContent' value={content} onChange={(e) => setContent(e.target.value)}/>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Link to Project (Optional)' id='postUrl' value={url} onChange={(e) => setUrl(e.target.value)}/>
                    <div>
                        <select className="form-control" placeholder="Choose a category" id="postCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option className="text-black" value='Choose a category'>Choose a category</option>
                            <option value="0x6de6b001f5f03f9fe3c98297f7e4d3295185b96a393c90398d0cdee4f2694df4">Defi</option>
                            <option value="0xa77f1113be27aab7c22b1887b26f15208cdf0872d2aa5c9ba44722d3bf791329">NFTs</option>
                            <option value="0x0fbb12a0dbec0b74ed070bdc5ff7eec11f01b14b8329ef73eff85ead4f785e50">DAOs</option>
                            <option value="0x2038e9667e480ecd03325bcef24b3bdbd4037f6f75c7538a13e2bc2b568d14cd">Metaverse</option>
                        </select>
                    </div>
                    {selectedFile && (
                        <div className='h-auto'>
                            <img src={selectedFile} onClick={onImageClick} className='cursor-pointer max-h-52'/>
                        </div>
                    )}
                    <div onClick={onImageClick} className='self-start flex flex-row space-x-4'>
                        <input
                            type="file"
                            name="file"
                            ref={inputFile}
                            accept="image/png, image/jpeg"
                            onChange={changeHandler}
                            style={{ display: "none"}}
                            id='postImg'
                        />
                        <PlusCircle className='w-10 self-end cursor-pointer rounded-full'/>
                        <p className='text-xl my-auto'>
                            Add Media
                        </p>
                    </div>
                    {/* <Tags /> */}
                    <div className='self-end flex flex-col space-y-4'>
                    {/* <motion.button whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='tracking-widest bg-[#202020] rounded-md outline outline-1 outline-[#343536] py-3 px-5 align-middle justify-center shadow-xl self-end' onClick={postMessage}>
                        Post
                    </motion.button> */}
                    <motion.button whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='tracking-widest bg-[#202020] rounded-md outline outline-1 outline-[#343536] py-3 px-5 align-middle justify-center shadow-xl self-end' onClick={addPostToBlockchain}>
                        Post on Blockchain
                    </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>  
    )
}

export default Modal