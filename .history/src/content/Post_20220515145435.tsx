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
  console.log(user)

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
                    <div className='p-5 flex flex-col ml-[250px]'>
                        <div className='w-full h-full flex flex-col p-5 space-y-5'>
                            <motion.div className='bg-[#0000003f] rounded-sm outline outline-1 outline-[#343536] w-full h-full flex flex-column p-4 space-y-5 align-bottom space-x-5'>
                                <div className='flex flex-col place-content-start space-y-3 mt-6'>
                                    <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}}>
                                    <Upvote className='w-10 cursor-pointer'/>
                                    </motion.button>
                                    <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}}>
                                    <Downvote className='w-10 cursor-pointer'/>
                                    </motion.button>
                                </div>
                                <div className='align-middle space-y-5'>
                                <motion.div >
                                    <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}></img>
                                    <div className="who">
                                    {e.attributes.postUserName.slice(0, 6)}
                                    <div className="accWhen">{
                                            `${e.attributes.postAcc.slice(0, 4)}...${e.attributes.postAcc.slice(38)} · 
                                            ${e.attributes.createdAt.toLocaleString('en-us', { min: 'numeric' })}
                                            `  
                                        }
                                        </div>
                                    </div>
                                </motion.div>
                                <div className='postContent'>
                                    {e.attributes.postContent}
                                    {/* <img src={defaultImgs[0]} className="postImg"></img> */}
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