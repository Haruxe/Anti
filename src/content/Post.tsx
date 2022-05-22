import React from 'react';
import { useEffect, useState, createElement } from "react";
import { motion } from 'framer-motion';
import { Check, Downvote, Upvote } from 'styled-icons/boxicons-regular';
import { Comment, Tooltip, Avatar, message, Divider } from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons";
import { Share, Tag } from 'styled-icons/bootstrap';
import { CommentAlt } from 'styled-icons/fa-regular';
import { defaultImgs } from '../defaultimgs';
import './CSS/Post.css';
import { Moralis } from "moralis"
import { Link } from 'react-router-dom';
// import { message } from 'antd';
import { useMoralisQuery, useWeb3ExecuteFunction} from 'react-moralis';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import Votes from './Votes';

function Post({post, profile}) {

    const { contentId, postId, postOwner } = post;
    // console.log(contentId, postId, postOwner)
    const [postContent, setPosContent] = useState({ title: "default", content: "default" });
    const { data } = useMoralisQuery("Contents", (query) => query.equalTo("contentId", contentId));
    const [voteStatus, setVoteStatus] = useState();
    const { data: votes } = useMoralisQuery("Votes", (query) => query.equalTo("postId", postId), [], {
        live: true,
    });
    const { walletAddress, contractABI, contractAddress} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI);
    const contractProcessor = useWeb3ExecuteFunction();
    const [postArr, setPostArr] = useState();
    
    useEffect(() => {
        function extractUri(data) {
          const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
          const contentUri = fetchedContent[0]["contentUri"];
          return contentUri;
        }
        async function fetchIPFSDoc(ipfsHash) {
          const url = ipfsHash;
          const response = await fetch(url);
          return await response.json();
        }
        async function processContent() {
          const content = await fetchIPFSDoc(extractUri(data));
          setPosContent(content);
        }
        if (data.length > 0) {
          processContent();
        }
    }, [data]);
    
    useEffect(() => {
        if (!votes?.length) return;

        async function getPostVoteStatus() {
            const fetchedVotes = JSON.parse(JSON.stringify(votes));
            fetchedVotes.forEach(({ voter, up }) => {
            if (voter === walletAddress) setVoteStatus(up ? "liked" : "disliked");
            });
            return;
        }

        getPostVoteStatus();
    }, [votes, walletAddress]);
  
    useEffect(() => {
        
        async function getPosts() {
            try {
                const Posts = await Moralis.Object.extend("Posts");
                const query = new Moralis.Query(Posts);
                if (profile) {
                    query.equalTo("postAcc", window.location.href.split('/')[4])
                }
                const results = await query.find();
            
                setPostArr(results);
            } catch (error) {
                console.log(error)
            }
        }
        getPosts();
    }, [profile]);

    async function vote(direction) {
        if (walletAddress.toLowerCase() === postOwner.toLowerCase()) return message.error("You cannot vote on your posts");
        if (voteStatus) return message.error("Already voted");
        const options = {
            contractAddress: contractAddress,
            functionName: direction,
            abi: contractABIJson,
            params: {
              _postId: post["postId"],
              [direction === "voteDown" ? "_reputationTaken" : "_reputationAdded"]: 1,
            },
          };
          await contractProcessor.fetch({
            params: options,
            onSuccess: () => console.log("success"),
            onError: (error) => console.error(error),
        });
    }
   
    
    // useEffect(() => {
    //     async function getBlockchainPosts() {
    //         try {
    //             const BlockchainPosts = await Moralis.Object.extend("BlockchainPosts");
    //             const query = new Moralis.Query(BlockchainPosts);
    //             if (profile) {
    //                 query.equalTo("postOwner", window.location.href.split('/')[4])
    //             }
    //             const res = await query.find();
    //             setBlockchainPostArr(res);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getBlockchainPosts();
    // }, [profile]);
    
    
  return (
      <>
        {postArr?.map((e) => {
            let categoryFlair = '';
            switch (e.attributes.postCategory) {
                case ('0x6de6b001f5f03f9fe3c98297f7e4d3295185b96a393c90398d0cdee4f2694df4'):
                    categoryFlair = 'DeFi';
                    break;
                case ('0xa77f1113be27aab7c22b1887b26f15208cdf0872d2aa5c9ba44722d3bf791329'):
                    categoryFlair = 'NFTs';
                    break;
                case ('0x0fbb12a0dbec0b74ed070bdc5ff7eec11f01b14b8329ef73eff85ead4f785e50'):
                    categoryFlair = 'DAOs';
                    break;
                case ('0x2038e9667e480ecd03325bcef24b3bdbd4037f6f75c7538a13e2bc2b568d14cd'):
                    categoryFlair = 'Metaverse';
                    break;
                case ('0x110861ee2dcc4d491b5a0a5af51d92eef615fe41ad22e8901688db04596f97f7'):
                    categoryFlair = 'DApps';
                    break;
                case ('0x28b335832df970d0015f078d7815cdb26d5a627955bde36416546d0240bbd78a'):
                    categoryFlair = 'Other';
                    break;
            }
            return(
                <>
                    <div className='flex flex-col bg-[#202020] rounded-md outline outline-1 outline-[#343536]'>
                        <div className='w-full h-full flex flex-col px-2 space-y-5'>
                            <motion.div className=' w-full h-full flex flex-column p-8 space-y-5 align-bottom space-x-5'>
                                <div className='align-middle space-y-5 w-full'>
                                    <div className='flex justify-center'>
                                    <div className='flex rounded-md space-x-4 text-lg'>
                                    <Tag className='w-8'/><p className='my-auto'>{categoryFlair}</p>
                                    </div>
                                </div>
                                <div className='bg-slate-200 opacity-20 h-[3px] rounded-xl'>

                                </div>
                                <motion.div className='flex flex-row space-x-5 text-xl' >
                                    
                                    <Link to={'/u/' + e?.attributes?.postAcc}>
                                    <img src={e?.attributes?.postPfp ? e?.attributes?.postPfp : defaultImgs[0]} alt='pfp' className='w-14 h-14 cursor-pointer rounded-full'></img>
                                    </Link>
                                    <div>
                                    <div className="flex flex-col space-y-2">
                                        <Link to={'/u/' + e?.attributes.postAcc}>
                                        <p className='m-0 text-white'>
                                        {e?.attributes.postUserName?.slice(0, 6)} <span className='text-slate-400 text-sm'>{e?.attributes.postAcc?.slice(0, 4)}...${e?.attributes.postAcc?.slice(38)}</span>
                                        </p>
                                        </Link>
                                        <div className='text-slate-400 text-sm'>{
                                            `
                                            ${e?.attributes.createdAt?.toLocaleString('en-us', { min: 'numeric' })}
                                            `  
                                        }
                                        </div>
                                    </div>
                                    </div>
                                    
                                </motion.div>
                                
                                <div className='postContent text-xl text-left'>
                                    <div className='text-2xl font-bold'>
                                    {e.attributes.postTitle} 
                                    </div>
                                    <div className='text-lg text-slate-200'>
                                    {e.attributes.postContent}
                                    </div>
                                    {e.attributes.postImg && (
                                        <img
                                        src={e.attributes.postImg}
                                        className="rounded-sm"
                                        ></img>
                                    )}
                                    <a href={e.attributes.postUrl.startsWith('http://') || e.attributes.postUrl.startsWith('https://') ? e.attributes.postUrl : 'http://' + e.attributes.postUrl} target="_blank" className='mt-4'>{e.attributes.postUrl}</a>
                                </div>
                                
                                
                                </div>
                                
                            </motion.div>
                        </div>
                    </div>
                </>);}).reverse()}
    </>
  )
}

export default Post