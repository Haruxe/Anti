import React from 'react';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Downvote, Upvote } from 'styled-icons/boxicons-regular';
import { Share } from 'styled-icons/bootstrap';
import { CommentAlt } from 'styled-icons/fa-regular';
import { defaultImgs } from '../defaultimgs';
import './CSS/Post.css';
import { Moralis } from "moralis"
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useMoralisQuery } from 'react-moralis';

function Post({post, profile}) {

    // const { contentId, postId, postOwner } = post;
    // console.log(post)
    const [postArr, setPostArr] = useState();
    // console.log(postArr)
    // const [contentId, setContentId] = useState();
    // const [postId, setPostId] = useState();
    // const [postOwner, setPostOwner] = useState();
    // const [blockchainPostArr, setBlockchainPostArr] = useState();

    const queryPost = useMoralisQuery(
        "BlockchainPosts",
        (query) => query.equalTo("postId", post["postId"]),
        [post],
        { live: true }
    );
    console.log(queryPost.data)
    
  
    useEffect(() => {
        async function getPosts() {
            try {
                const Posts = await Moralis.Object.extend("Posts");
                const query = new Moralis.Query(Posts);
                if (profile) {
                    query.equalTo("postAcc", window.location.href.split('/')[4])
                }
                const results = await query.find();
                // console.log(str)
                
                const filteredQuery = results.filter((attributes) => attributes.postCategory === queryPost["categoryId"]);
                // console.log(filteredQuery)

                setPostArr(results);
            } catch (error) {
                console.log(error)
            }
        }
        getPosts();
    }, [profile]);
   
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
    
    function vote(input) {
        message.success("message")
    }

  return (
      <>
        {postArr?.map((e) => {
            return (
                <>
                    <div className='flex flex-col bg-[#202020] rounded-sm outline outline-1 outline-[#343536]'>
                        <div className='w-[800px] h-full flex flex-col px-2 space-y-5'>
                            <motion.div className=' w-full h-full flex flex-column p-4 space-y-5 align-bottom space-x-5'>
                                <div className='flex flex-col place-content-start space-y-3 mt-6'>
                                    <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}} onClick={() => vote("voteUp")}>
                                        <Upvote className='w-10 cursor-pointer' />
                                    </motion.button>
                                    <span>0</span>
                                    <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}} onClick={() => vote("voteDown")}>
                                        <Downvote className='w-10 cursor-pointer' />
                                    </motion.button>
                                </div>
                                <div className='align-middle space-y-5'>
                                <motion.div className='flex flex-row space-x-5 text-xl' >
                                    <Link to={'/u/' + e?.attributes?.postAcc}>
                                    <img src={e?.attributes?.postPfp ? e?.attributes?.postPfp : defaultImgs[0]} alt='pfp' className='w-14 h-14 cursor-pointer rounded-full'></img>
                                    </Link>
                                    <div>
                                    <div className="flex flex-col space-y-2">
                                        <Link to={'/u/' + e?.attributes.postAcc}>
                                        <p className='m-0 text-white'>
                                        {e?.attributes.postUserName?.slice(0, 6)} <span className='text-slate-400 text-sm'>{e?.attributes.postAcc.slice(0, 4)}...${e?.attributes.postAcc.slice(38)}</span>
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
                                    <br />
                                    {e.attributes.postImg && (
                                        <img
                                        src={e.attributes.postImg}
                                        className="rounded-sm"
                                        ></img>
                                    )}
                                    <a href={e.attributes.postUrl} target="_blank">Link</a>
                                    <br />
                                </div>
                                <div className='flex flex-row justify-start space-x-20'>
                                <motion.button>
                                    <CommentAlt className='w-8 my-auto' />
                                </motion.button>
                                <motion.button>
                                    <Share className='w-6 my-auto' />
                                </motion.button>
                                </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            );
        }).reverse()}
    </>
  )
}

export default Post