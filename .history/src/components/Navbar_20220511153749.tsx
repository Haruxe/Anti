import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Triangle } from 'styled-icons/bootstrap';
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
// import "./style.css"
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
import NativeBalance from './NativeBalance';

import '../index.css';
const { Header } = Layout;

const styles = {
  header: {
    // position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};

function Navbar() {
  return (
    <div>
      <div className='bg-[#202020] outline outline-1 outline-[#343536] w-screen h-[3rem] grid grid-flow-col px-5'>
            <div className='my-auto text-4xl space-x-10 flex flex-row'>
              <motion.button className='tracking-widest' whileHover={{scale: 1.1}}>
                  <Link to='/home'>
                  <div className='flex flex-row space-x-3 align-middle'>
                    <Triangle className='w-8 fill-white'/>
                    <p className='my-auto text-white'>Anti</p>
                  </div>
                  </Link>
              </motion.button>
            </div>
            <div className='flex flex-row justify-self-end'>
                  <NativeBalance />
                  <Account />
                  <Chains />
            </div>
        </div> 
    </div>

  )
}

export default Navbar