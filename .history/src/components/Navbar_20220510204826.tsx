import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout, Tabs } from "antd";
import "./style.css"
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
// import '../index.css';
const { Header, Footer } = Layout;

const styles = {
  header: {
    position: "fixed",
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
    <Header style={styles.header}>
      <div style={styles.headerRight}>
        <Chains />
        <Account />
      </div>
    </Header>

    {/* // <div className='bg-[#0000003f] w-screen h-[4rem] flex align-middle'>
    //     <div className='mx-10 my-auto text-4xl space-x-10'>
    //       <motion.button className='tracking-widest' whileHover={{scale: 1.1}}>
    //           <Link to='/home'>
    //             Anti
    //           </Link>
    //       </motion.button>
    //     </div>
    // </div> */}
  )
}

export default Navbar