import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Triangle } from 'styled-icons/bootstrap';
import '../index.css';

function Navbar() {
  return (
    <div className='bg-[#202020] outline outline-1 outline-[#343536] w-screen h-[3rem] flex align-middle'>
        <div className='mx-10 my-auto text-2xl space-x-10'>
            <motion.button className='tracking-widest' whileHover={{scale: 1.1}}>
                <Link to='/home'>
                  <div className='flex flex-row space-x-3 align-middle'>
                    <Triangle className='w-8'/>
                    <p className='my-auto'>Anti</p>
                  </div>
                </Link>
            </motion.button>
        </div>
    </div>
  )
}

export default Navbar