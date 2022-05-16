import React from 'react'
import { Comment, Verified } from 'styled-icons/material'
import { Profile } from 'styled-icons/remix-line'
import { motion } from 'framer-motion';
import { Downvote, Upvote } from 'styled-icons/boxicons-regular';
import { CommentAdd } from 'styled-icons/fluentui-system-filled';
import { Share } from 'styled-icons/bootstrap';
import { CommentAlt } from 'styled-icons/fa-regular';

function Post() {
  return (
    <motion.div className='bg-[#0000003f] rounded-sm outline outline-1 outline-[#343536] w-full h-full flex flex-row p-4 space-y-5 align-bottom space-x-5'>
      <div className='flex flex-col place-content-start space-y-3 mt-6'>
        <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}}>
          <Upvote className='w-10 cursor-pointer'/>
        </motion.button>
        <motion.button whileHover={{color: '#777777'}} transition={{duration: 0.2}}>
          <Downvote className='w-10 cursor-pointer'/>
        </motion.button>
      </div>
        <div className='align-middle space-y-5'>
                <motion.div className="flex flex-row align-middle space-x-5">
                  <img src={e.attributes.tweeterPfp ? e.attributes.tweeterPfp : defaultImgs[0]} className="profilePic"></img>
                    {/* <Profile className='w-[3rem]'/>
                    <h1 className="my-auto text-xl text-white">
                        <Verified className='w-[1rem] '/> Doodles
                    </h1> */}
                </motion.div>
                <div className='cursor-pointer'>
                <h1 className='text-xl text-white'>
                    This is a post.
                </h1>
                <p className='text'>
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
                </p>
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
  )
}

export default Post