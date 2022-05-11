import React from 'react'
import { Verified } from 'styled-icons/material'
import { Profile } from 'styled-icons/remix-line'
import { motion } from 'framer-motion';

function Post() {
  return (
    <motion.div className='bg-[#0000003f] rounded-sm outline outline-1 outline-[#343536] w-full h-full flex flex-col p-10 space-y-5'
    whileHover={{cursor: 'pointer'}}>
        <div className='align-middle space-y-5'>
                <div className="flex flex-row align-middle space-x-5">
                    <Profile className='w-[3rem]'/>
                    <h1 className="my-auto text-xl text-white">
                        <Verified className='w-[1rem] '/> Doodles
                    </h1>
                </div>
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
    </motion.div>
  )
}

export default Post