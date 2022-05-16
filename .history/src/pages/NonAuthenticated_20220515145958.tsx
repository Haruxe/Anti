import React from 'react';
import { motion } from 'framer-motion';
import Account from "../components/Account/Account";
import { AccountCircle } from 'styled-icons/material';

function NonAuthenticated() {
  return (
    <div className='p-10'>
      <div className='bg-[#00000016] w-screen h-screen rounded-sm flex flex-col'>
        <motion.button className='tracking-widest mx-auto' whileHover={{scale: 1.1}}>
          <div className='flex flex-row space-x-3'>
              <AccountCircle className='w-7'/><Account />
          </div>
        </motion.button>
      </div>
    </div>
  )
}

export default NonAuthenticated