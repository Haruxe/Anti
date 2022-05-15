import React from 'react';
import { motion } from 'framer-motion';
import Account from "../components/Account/Account";
import { AccountCircle } from 'styled-icons/material';
import { Link } from 'react-router-dom';

function NonAuthenticated() {
  return (
    <div className='p-10'>
      <div className='bg-[#00000016] w-screen h-screen rounded-sm flex flex-col'>
        <h1 className='p-10 text-4xl text-white'>
          Please click "Connect Your Wallet!"
        </h1>
        <motion.button className='tracking-widest mx-auto' whileHover={{scale: 1.1}}>
          <div className='flex flex-row space-x-3'>
            <Link to='/home'>
              <AccountCircle className='w-7'/><Account />
            </Link>
          </div>
        </motion.button>
      </div>
    </div>
  )
}

export default NonAuthenticated