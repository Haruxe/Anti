import { motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { Add } from 'styled-icons/material';

function AddPost() {

    function MakePost() {
        // @dev blurs the page
        const blurRoot = document.getElementById('page');
        blurRoot?.classList.add('blur-md')
        // @dev creates and renders new modal
        const modal = React.createElement(ModalElement);
        const modalRoot = document.getElementById('modalRoot');
        ReactDOM.render(modal, modalRoot);
    }

    const ModalElement = () => {
        return(
            <div className='flex justify-self-center self-center'>
                <div className='bg-black w-[30rem] h-[20rem] p-10 m-auto rounded-sm justify-self-center self-center'>
                    Hey!
                </div>
            </div>
        )
    }


  return (
    <div className='bg-[#0000003f] rounded-full p-2'>
        <motion.button whileHover={{cursor: 'pointer'}} onClick={MakePost}>
            <Add className='w-[3rem]'/>
        </motion.button>
    </div>
  )
}

export default AddPost