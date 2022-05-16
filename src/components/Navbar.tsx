import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
import NativeBalance from './NativeBalance';
import '../index.css';
import { Network } from 'styled-icons/entypo';
import { AccountCircle } from 'styled-icons/material';
import { Prism } from 'styled-icons/ionicons-outline';
import { Profile } from 'styled-icons/remix-line';
import { EmojiLaughing } from 'styled-icons/bootstrap';

function Navbar() {
  return (
    <div>
    <div className=' fixed h-full w-[250px] flex flex-col px-5 justify-center place-content-start space-y-10 top-10'>
            <div className='h-full mt-7 space-y-8'>
            <div className='text-4xl flex flex-row '>
              <div className='tracking-widest mx-auto' >
                  <div className='flex flex-row space-x-2 align-middle mx-auto'>
                    <Prism className='w-7 fill-white text-white mt-1'/>
                    <p className='my-auto text-white'>nti</p>
                  </div>
              </div>
            </div>
            <div className='flex flex-col space-y-8 text-xl tracking-widest'>
                  <NativeBalance />
                  <div className='flex flex-row space-x-3 '>
                    <Account />
                  </div>
            </div>
            <div className='flex flex-col space-y-8 '>
              <motion.button  whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='bg-[#202020] outline-[#343536] outline outline-1 rounded-lg tracking-widest px-7 py-3 '>
                <Link to='/Profile'>
                <div className='flex flex-row justify-start space-x-4 align-middle'>
                  <EmojiLaughing className='w-7 text-white' />
                  <p className='my-auto text-white text-left text-xl'>Profile</p>
                </div>
                </Link>
              </motion.button>
              <div className='flex flex-row space-x-3'>
                    <Chains />
                  </div>
            </div>
            </div>
            
        </div> 
    </div>

  )
}

export default Navbar