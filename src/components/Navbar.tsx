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
  const [textVisible, setTextVisible] = useState(window.innerWidth < 1300 ? false : true)

  useEffect(() => {
      setUsersPfp(user?.attributes.pfp)
  }, [account])

  useEffect(() => {
    function handleResize() {
        if (window.innerWidth < 1300){
            setTextVisible(false);
        }
        if (window.innerWidth > 1300){
            setTextVisible(true);
        }
    }
    window.addEventListener('resize', handleResize)
})

  return (
    <div>
    <div className=' fixed h-full flex flex-col px-5 space-y-10 top-10 justify-end place-content-end place-items-end items-end w-[250px]'>
            <div className='h-full mt-7 space-y-8'>
            <div className='text-4xl flex flex-row justify-end'>
              <div className='tracking-widest ' >
                  <div className='flex flex-row space-x-2 align-middle'>
                    <Prism className='w-12 fill-white text-white mt-3 self-end'/>
                    {textVisible ? <p className='my-auto text-white text-6xl'>nti<span className='text-sm tracking-tighter'>BETA</span></p> : <></>}
                  </div>
              </div>
            </div>
            <div className='flex flex-col space-y-8 text-xl tracking-widest'>
                  {textVisible ?<NativeBalance /> : <></>}
                  <div className='flex flex-row space-x-3 '>
                    <Account visible={textVisible}/>
                  </div>
            </div>
            
            {user ? <div className='flex flex-col space-y-8 '>
            
            <Link to={'/u/' + account}>
              
              <motion.button  whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='bg-[#202020] outline-[#343536] outline outline-1 rounded-lg tracking-widest px-7 py-3 w-full'>
                
                <div className='flex flex-row justify-start space-x-4 align-middle'>
                  <img src={usersPfp ? usersPfp : defaultImgs[1]} className='w-7 rounded-full text-white' />
                  {textVisible ? <p className='my-auto text-white text-left text-xl'>Profile</p> : <></>}
                </div>
                
              </motion.button>
              </Link>
              <div className='flex flex-row space-x-3'>
                    <Chains visible={textVisible}/>
                  </div>
                  <AddPost visible={textVisible}/>
            </div>: <></>}
            
            
            </div>

            
            
        </div> 
    </div>

  )
}

export default Navbar