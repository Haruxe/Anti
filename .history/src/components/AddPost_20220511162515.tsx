import { motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { X } from 'styled-icons/bootstrap';
import { Add } from 'styled-icons/material';
import Modal from './Modal';

function AddPost() {

    function MakePost() {
        // @dev blurs the page
        const blurRoot = document.getElementById('page');
        blurRoot?.classList.add('blur-md')
        // @dev creates and renders new modal
        const container = document.getElementById('modal');
        const root = ReactDOM.createRoot(container);
        root.render(<Modal />);
    }


  return (
    <div className='bg-[#202020] rounded-2xl p-2 outline outline-1 outline-[#343536]'>
        <motion.button whileHover={{cursor: 'pointer'}} onClick={MakePost}>
            <Add className='w-[3rem]'/>
        </motion.button>
    </div>
  )
}

export default AddPost