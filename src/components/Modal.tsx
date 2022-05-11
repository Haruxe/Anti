import React from 'react'
import { motion } from 'framer-motion';
import { Plus, X } from 'styled-icons/bootstrap';

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
            <motion.div className='bg-[#1A1A1B] outline outline-1 flex shadow-lg space-x-1 flex-row align-middle outline-[#343536] rounded-2xl px-4 py-2 cursor-pointer' whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}}>
                <button>
                    <Plus className='w-5 my-auto'/>
                </button>
                <h1 className='my-auto text-white text-lg'>
                    {props.name}
                </h1>
            </motion.div>
        )
    }

    const Tags = () => {
        return(
            <div className='flex flex-row space-x-5'>
                <Tag name='Promotional' />
                <Tag name='PSA' />
                <Tag name='Mint' />
            </div>
        )
    }

  return (
        <motion.div className='h-full w-full align-middle justify-center fixed z-40' animate={{scale: 1}} initial={{scale: 0}} exit={{scale: 0}}>
            <div className='flex justify-center h-screen'>
                <div className='bg-[#1A1A1B] w-[50rem] outline outline-1 outline-[#343536] flex flex-col space-y-10 h-[30rem] p-8 m-auto rounded-md justify-self-center self-center'>
                    <div className='flex'>
                        <h1 className='align-middle my-auto text-white text-lg'>
                        New Post
                        </h1>
                        <motion.button className='self-end ml-auto' onClick={ClosePost} whileHover={{scale: 1.05}}>
                            <X className='w-10 self-end' />
                        </motion.button>
                    </div>
                    <textarea className='mx-auto w-full outline outline-1 outline-[#343536] resize-none h-full bg-[#181818] text-white p-4 rounded-sm shadow-lg' placeholder='Your post'/>
                    <Tags />
                    <motion.button className='px-6 py-3 bg-white text-black self-end rounded-sm outline outline-1 outline-[#343536]'>
                        enter
                    </motion.button>
                </div>
             </div>
        </motion.div>
        
    )
}

export default Modal