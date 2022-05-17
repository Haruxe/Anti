import React from 'react';
import { useEffect, useState } from "react";
import { Comment, Verified } from 'styled-icons/material';
import { Profile } from 'styled-icons/remix-line';
import { motion } from 'framer-motion';
import { Downvote, Upvote } from 'styled-icons/boxicons-regular';
import { CommentAdd } from 'styled-icons/fluentui-system-filled';
import { Share } from 'styled-icons/bootstrap';
import { CommentAlt } from 'styled-icons/fa-regular';
import { defaultImgs } from '../defaultimgs';
import './CSS/Post.css';
import { useMoralis } from "react-moralis"

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Post({profile}) {

  const { Moralis, account } = useMoralis();
  Moralis.start({serverUrl, appId})
  const user = Moralis.User.current();
//   console.log(user)

  const [postArr, setPostArr] = useState();

    useEffect(() => {
        async function getPosts() {
            try {
                const Posts = Moralis.Object.extend("Posts");
                const query = new Moralis.Query(Posts);
                if (profile) {
                    query.equalTo("postAcc", account)
                }
                const results = await query.find();

                setPostArr(results);
                console.log(results);
            } catch (error) {
                console.log(error)
            }
        }
        getPosts();
    }, [profile]);

  return (
      <>
        {postArr?.map((e) => {
            return (
                <>
                    <div className='flex flex-col bg-[#202020] rounded-sm outline outline-1 outline-[#343536]'>
                        <div className='w-[700px] h-full flex flex-col px-2 space-y-5'>
                            <motion.div className=' w-full h-full flex flex-column p-4 space-y-5 align-bottom space-x-5'>
                                <div className='flex flex-col place-content-start space-y-3 mt-6'>
                                    <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}}>
                                    <Upvote className='w-10 cursor-pointer'/>
                                    </motion.button>
                                    <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}}>
                                    <Downvote className='w-10 cursor-pointer'/>
                                    </motion.button>
                                </div>
                                <div className='align-middle space-y-5'>
                                <motion.div className='flex flex-row space-x-5 text-xl' >
                                    <img src={e.attributes.postPfp ? e.attributes.postPfp : defaultImgs[0]} alt='pfp' className='w-14 h-14 cursor-pointer rounded-full'></img>
                                    <div>
                                    <div className="flex flex-col space-y-2">
                                        <p className='m-0'>
                                        {e.attributes.postUserName.slice(0, 6)} <span className='text-slate-400 text-sm'>{e.attributes.postAcc.slice(0, 4)}...${e.attributes.postAcc.slice(38)}</span>
                                        </p>
                                        <div className='text-slate-400 text-sm'>{
                                            `
                                            ${e.attributes.createdAt.toLocaleString('en-us', { min: 'numeric' })}
                                            `  
                                        }
                                        </div>
                                    </div>
                                    </div>
                                    
                                </motion.div>
                                
                                <div className='postContent text-xl text-left'>
                                    <p className='text-2xl font-bold'>
                                    {e.attributes.postTitle} 
                                    </p>
                                    <p className='text-lg text-slate-200'>
                                    {e.attributes.postContent}
                                    </p>
                                    <br />
                                    {e.attributes.postImg && (
                                        <img
                                        src={e.attributes.postImg}
                                        className="postImg"
                                        ></img>
                                    )}
                                    <br />
                                    <a href={e.attributes.postUrl} target="_blank">{e.attributes.postUrl}</a>
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