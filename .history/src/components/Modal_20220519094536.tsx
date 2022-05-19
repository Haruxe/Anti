import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion';
import { Plus, X, Image } from 'styled-icons/bootstrap';
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

    async function addPostToBlockchain(post) {

        const blockchainPost = Moralis.Object.extend("blockchainPosts");
        const newBlockchainPost = new blockchainPost();
        newBlockchainPost.set("postTitle", document.getElementById('postTitle').value)
        newBlockchainPost.set("postContent", document.getElementById('postContent').value)
        newBlockchainPost.set("postUrl", document.getElementById('postUrl').value)
        newBlockchainPost.set("postCategory", document.getElementById('category').value)
        newBlockchainPost.set("postPfp", user.attributes.pfp);
        newBlockchainPost.set("postAcc", user.attributes.ethAddress);
        newBlockchainPost.set("postUserName", user.attributes.username);
        
        const data = theFile;
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();
        newBlockchainPost.set("postImg", file.ipfs());

        const contentUri = await processContent(newBlockchainPost);
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
        
        postMessage();
    }

    const processContent = async (content) => {

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
            'url': document.getElementById('postUrl').value,
            'category': document.getElementById('postCategory').value,
        };

        const metadataFile = new Moralis.File('metadata.json', { base64: btoa(JSON.stringify(metadata))});
        console.log(metadataFile)
        await metadataFile.saveIPFS();

        const Post = Moralis.Object.extend("Posts");
        const newPost = new Post();
        newPost.set("postTitle", document.getElementById('postTitle').value)
        newPost.set("postContent", document.getElementById('postContent').value)
        newPost.set("postUrl", document.getElementById('postUrl').value)
        newPost.set("postCategory", document.getElementById('category').value)
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
    
        e.preventDefault();
        // if(!validateForm()){
        //     return message.error("Remember to add the title and the content of your post")
        // }
        addPostToBlockchain({title, content, url, category, theFile})
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
                            <option value="0x6de6b001f5f03f9fe3c98297f7e4d3295185b96a393c90398d0cdee4f2694df4">Defi</option>
                            <option value="0xa77f1113be27aab7c22b1887b26f15208cdf0872d2aa5c9ba44722d3bf791329">NFTs</option>
                            <option value="0x0fbb12a0dbec0b74ed070bdc5ff7eec11f01b14b8329ef73eff85ead4f785e50">DAOs</option>
                            <option value="0x2038e9667e480ecd03325bcef24b3bdbd4037f6f75c7538a13e2bc2b568d14cd">Metaverse</option>
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
                            accept="image/png, image/jpeg"
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