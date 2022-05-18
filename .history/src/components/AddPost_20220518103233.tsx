import { motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Add as AddSign } from 'styled-icons/material';
import Modal from './Modal';
import Moralis from 'moralis';
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "./MoralisDappProvider/MoralisDappProvider";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function AddPost() {
    function MakePost() {
      

      Moralis.start({serverUrl, appId})
      // @dev blurs the page
      const blurRoot = document.getElementById('page');
      blurRoot?.classList.add('blur-md')
      // @dev creates and renders new modal
      const container = document.getElementById('modal');
      const root = ReactDOM.createRoot(container);
      root.render(<Modal />);
    }

    const Add = () => {
      return(
        <motion.button  onClick={MakePost} className='flex flex-row align-middle space-x-3 px-7 py-3 cursor-pointer bg-[#202020] rounded-lg outline outline-1 outline-[#343536] w-full' whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}}>
            <AddSign className='w-7'/>
            <p className='text-xl my-auto'>
              Create
            </p>
        </motion.button>
      )
    }
  return (

    <Add />
  )
}

export default AddPost