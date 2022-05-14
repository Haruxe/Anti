// import { motion } from 'framer-motion';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import { Link } from 'react-router-dom';
import { Triangle } from 'styled-icons/bootstrap';
import "antd/dist/antd.css";
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
import NativeBalance from './NativeBalance';
import '../index.css';
import { Network } from 'styled-icons/entypo';
import { AccountCircle } from 'styled-icons/material';

function Navbar() {
  return (
    <div>
    <div className='bg-[#202020] outline outline-1 outline-[#343536] fixed h-full w-[250px] flex flex-col px-5 justify-center place-content-start space-y-10 top-0 '>
            <div className='h-full mt-7 space-y-10'>
            <div className='text-4xl flex flex-row '>
              <motion.button className='tracking-widest mx-auto' whileHover={{scale: 1.1}}>
                  <Link to='/home'>
                  <div className='flex flex-row space-x-2 align-middle mx-auto'>
                    <Triangle className='w-7 fill-white mt-1'/>
                    <p className='my-auto text-white'>nti</p>
                  </div>
                  </Link>
              </motion.button>
            </div>
            <div className='flex flex-col space-y-10'>
                  <NativeBalance />
                  <div className='flex flex-row space-x-3'>
                    <AccountCircle className='w-7'/><Account />
                  </div>
                  <div className='flex flex-row space-x-3'>
                    <Network className='w-7'/><Chains />
                  </div>
            </div>
            <div className='flex flex-col space-y-10'>
              <motion.button className='tracking-widest mx-auto' whileHover={{scale: 1.1}}>
                <Link to='/Profile'>
                <div className='flex flex-row space-x-2 align-middle mx-auto'>
                  <p className='my-auto text-white'>Profile</p>
                </div>
                </Link>
              </motion.button>
              <div className='flex flex-col space-y-10'>
              <motion.button className='tracking-widest mx-auto' whileHover={{scale: 1.1}}>
                <Link to='/Settings'>
                <div className='flex flex-row space-x-2 align-middle mx-auto'>
                  <p className='my-auto text-white'>Settings</p>
                </div>
                </Link>
              </motion.button>
            </div>
            </div>
            </div>
        </div> 
    </div>

  )
}

export default Navbar