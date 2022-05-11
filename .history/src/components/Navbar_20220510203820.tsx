import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
import '../index.css';

function Navbar() {
  return (
    <div className='bg-[#0000003f] w-screen h-[4rem] flex align-middle'>
      <div className='mx-10 my-auto text-4xl space-x-10'>
        <motion.button className='tracking-widest' whileHover={{scale: 1.1}}>
          <Link to='/home'>
           Anti
          </Link>
        </motion.button>
        <motion.div>
          {/* < Chains /> */}
        </motion.div>
      </div>
    </div>
    // <div className='bg-[#0000003f] w-screen h-[4rem] flex align-middle'>
    //     <div className='mx-10 my-auto text-4xl space-x-10'>
    //       <motion.button className='tracking-widest' whileHover={{scale: 1.1}}>
    //           <Link to='/home'>
    //             Anti
    //           </Link>
    //       </motion.button>
    //     </div>
    // </div>
  )
}

export default Navbar