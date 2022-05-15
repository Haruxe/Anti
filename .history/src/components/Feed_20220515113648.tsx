import React from "react"
// import Moralis from 'moralis';
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Downvote, Upvote } from 'styled-icons/boxicons-regular';
import { Share } from 'styled-icons/bootstrap';
import { CommentAlt } from 'styled-icons/fa-regular';
import { defaultImgs } from '../defaultimgs';
// import Post from "../content/Post"
// import Sidebar from "../content/Sidebar"

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Feed ({profile}) {
    // const [sidebarVisible, setSidebarVisible] = useState(false);

    const { Moralis, account } = useMoralis();
    Moralis.start({serverUrl, appId})
    // const user = Moralis.User.current();
    // const account = user.attributes.account;
    

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

    // useEffect(() => {
    //     function handleResize() {
    //         if (window.innerWidth < 1300){
    //             setSidebarVisible(false);
    //         }
    //         if (window.innerWidth > 1300){
    //             setSidebarVisible(true);
    //         }
    //     }
    //     window.addEventListener('resize', handleResize)
    // })

    // const SidebarContent = () => {
    //     return(
    //         <>
    //     <div className="flex auto flex-col pt-5 space-y-5 w-1/4">
    //     <div className="flex-col space-y-2">
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //     </div>
    //     </div>
    //     </>
    //     )
    // }

    // async function FetchFeed(){
    //     const Posts = await Moralis.Object.extend('Posts')
    //     const Users = await Moralis.Object.extend('_User')
    //     const queryUser = new Moralis.Query(Users)
    //     queryUser.equalTo('accounts', user.attributes.ethAddress)
    //     let usersFollowing = await queryUser.find();
    //     let totalPosts;
    //     for (let i = 0; i < usersFollowing.length; i++){
    //         const query = new Moralis.Query(Posts);
    //         query.equalTo('user', usersFollowing[i]);
    //         totalPosts.push(query.find());
    //     }
    // }

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
                                    <motion.div className="feedPost">
                                        <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
                                        <div className="who">
                                        {e.attributes.postUserName.slice(0, 6)}
                                        <div className="accWhen">{
                                                `${e.attributes.postAcc.slice(0, 4)}...${e.attributes.postAcc.slice(38)} · 
                                                ${e.attributes.createdAt.toLocaleString('en-us', { min: 'numeric' })}
                                                `  
                                            }
                                            </div>
                                        </div>
                                        {/* <Profile className='w-[3rem]'/>
                                        <h1 className="my-auto text-xl text-white">
                                            <Verified className='w-[1rem] '/> Doodles
                                        </h1> */}
                                    </motion.div>
                                    <div className='postContent'>
                                        {e.attributes.postContent}
                                        {/* <p className='text'>
                                        Lorem ipsum dolor sit amet, 
                                        consectetur adipiscing elit, 
                                        sed do eiusmod tempor incididunt 
                                        ut labore et dolore magna aliqua. 
                                        Vitae aliquet nec ullamcorper sit. 
                                        Nec ultrices dui sapien eget mi. 
                                        Turpis tincidunt id aliquet risus feugiat. 
                                        Sed egestas egestas fringilla phasellus. 
                                        Hendrerit dolor magna eget est. Consectetur 
                                        lorem donec massa sapien faucibus et 
                                        molestie ac.
                                        </p> */}
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
                                {/* <Post /> */}
                            </div>
                            {/* {sidebarVisible && <SidebarContent />} */}
                        </div>
                    </>
                );
            }).reverse()}
        </>
    )
}

export default Feed