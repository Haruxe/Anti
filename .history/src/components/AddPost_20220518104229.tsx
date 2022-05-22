import { motion } from 'framer-motion';
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import { Add as AddSign } from 'styled-icons/material';
import Modal from './Modal';
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "../MoralisDappProvider/MoralisDappProvider";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

function AddPost() {
    function MakePost() {
      // @dev blurs the page
      const blurRoot = document.getElementById('page');
      blurRoot?.classList.add('blur-md')
      // @dev creates and renders new modal
      const container = document.getElementById('modal');
      const root = ReactDOM.createRoot(container);
      root.render(
        <StrictMode>
          <Application />
        </StrictMode>
      );
    }

    const Application = () => {
      const isServerInfo = APP_ID && SERVER_URL ? true : false;
      //Validate
      if ( !APP_ID || !SERVER_URL )
        throw new Error(
          "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
        );
      if ( isServerInfo )
        return (
          <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
            <MoralisDappProvider>
              <Modal isServerInfo/>
            </MoralisDappProvider>
          </MoralisProvider>
        );
      else {
        return; 
      };
    };

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