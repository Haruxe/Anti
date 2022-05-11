import React from 'react'
import { motion } from 'framer-motion';
import { X } from 'styled-icons/bootstrap';

function Modal() {

    function ClosePost() {
        // @dev de-blurs the page
        const blurRoot = document.getElementById('page');
        blurRoot?.classList.remove('blur-md')
        // @dev deletes modal
        const modal = document.getElementById('modal')?.lastChild;
        modal.remove();
    }

    function Tag(props){
        return(
            <h1 className='bg-[#1A1A1B] outline outline-1 outline-[#343536] rounded-2xl px-4 py-2'>
                {props.name}
            </h1>
        )
    }

    const Tags = () => {
        return(
            <div className='flex flex-row space-x-5'>
                <Tag name='Promotional' />
                <Tag name='Dev-Log' />
                <Tag name='Spoiler' />
            </div>
        )
    }

  return (
            <motion.div className='h-full w-full align-middle justify-center fixed z-40' animate={{scale: 1}} initial={{scale: 0}} exit={{scale: 0}}>
                <div className='flex justify-center h-screen'>
                <div className='bg-[#1A1A1B] w-[50rem] outline outline-1 outline-[#343536] flex flex-col space-y-10 h-[30rem] p-8 m-auto rounded-md justify-self-center self-center'>
                    <div className='flex'>
                        <h1 className='align-middle my-auto'>
                        New Post
                        </h1>
                        <button className='self-end ml-auto' onClick={ClosePost}>
                            <X className='w-10 self-end'/>
                        </button>
                    </div>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Your post'/>
                    <Tags />
                    <motion.button className='px-6 py-3 bg-slate-100 text-black self-end rounded-sm '>
                        enter
                    </motion.button>
                </div>
            </div>
            </motion.div>
            
        )
}

export default Modal