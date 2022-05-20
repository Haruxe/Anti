import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
import NativeBalance from './NativeBalance';
import '../index.css';
import { Prism } from 'styled-icons/ionicons-outline';
import AddPost from './AddPost';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import { defaultImgs } from '../defaultimgs';

function Navbar() {
  const { account, user } = useMoralis();
  const [usersPfp, setUsersPfp] = useState(user ? user.attributes.pfp : defaultImgs[1]);

  useEffect(() => {
      setUsersPfp(user?.attributes.pfp)
  }, [account])

  return (
    <div>
    <div className=' fixed h-full w-[250px] flex flex-col px-5 justify-center place-content-start space-y-10 top-10'>
            <div className='h-full mt-7 space-y-8'>
            <div className='text-4xl flex flex-row '>
              <div className='tracking-widest mx-auto' >
                  <div className='flex flex-row space-x-2 align-middle mx-auto'>
                    <Prism className='w-12 fill-white text-white mt-1'/>
                    <p className='my-auto text-white text-6xl'>nti</p>
                  </div>
              </div>
            </div>
            <div className='flex flex-col space-y-8 text-xl tracking-widest'>
                  <NativeBalance />
                  <div className='flex flex-row space-x-3 '>
                    <Account />
                  </div>
            </div>
            
            {user ? <div className='flex flex-col space-y-8 '>
            
            <Link to={'/u/' + account}>
              
              <motion.button  whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='bg-[#202020] outline-[#343536] outline outline-1 rounded-lg tracking-widest px-7 py-3 w-full'>
                
                <div className='flex flex-row justify-start space-x-4 align-middle'>
                  <img src={usersPfp ? usersPfp : defaultImgs[1]} className='w-7 rounded-full text-white' />
                  <p className='my-auto text-white text-left text-xl'>Profile</p>
                </div>
                
              </motion.button>
              </Link>
              <div className='flex flex-row space-x-3'>
                    <Chains />
                  </div>
                  <AddPost />
            </div>: <></>}
            
            
            </div>

            
            
        </div> 
    </div>

  )
}

export default Navbar