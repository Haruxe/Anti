import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";
import { motion } from 'framer-motion';
import { Chain, Matic } from "styled-icons/crypto";
import { Ethereum } from "styled-icons/fa-brands";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "0 10px",
  },
};

const menuItems = [
  // {
  //   key: "0x1",
  //   value: "Ethereum",
  //   icon: <Ethereum />,
  // },
  //{
  //  key: "0x539",
  //  value: "Local Chain",
  //  icon: <Ethereum className="w-7 h-7 flex-0 self-start"/>,
  //},
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <Ethereum />,
  // },
  {
    key: "0x4",
    value: "Rinkeby",
    icon: <Ethereum className="w-7 h-7 flex-0 self-start"/>,
  },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <Ethereum />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <Ethereum />,
  // },
  // {
  //   key: "0x38",
  //   value: "Binance",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x61",
  //   value: "Smart Chain Testnet",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x89",
  //   value: "Polygon",
  //   icon: <PolygonLogo />,
  // },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <Matic className="w-7 h-7 flex-0 self-start"/>,
  },
  // {
  //   key: "0xa86a",
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  // },
  // {
  //   key: "0xa869",
  //   value: "Avalanche Testnet",
  //   icon: <AvaxLogo />,
  // },
];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});
  if (!chain){
    switchNetwork("0x13881");
  }

  useEffect(() => {
    if (!chainId) return undefined;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className='align-middle my-auto' style={{borderRadius: '10px'}}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item} className='my-auto'>
          <span style={{ marginLeft: "5px" }} className='my-auto'>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!chainId || !isAuthenticated) return null;

  return (
    <div className="mx-auto w-full justify-center">
      <Dropdown overlay={menu} trigger={["click"]}>
        <motion.button 
          key={selected?.key}
          icon={selected?.icon}
          whileHover={{backgroundColor: '#2F2F2F', outlineColor: '#4E4E4E'}} className='w-full bg-[#202020] outline-[#343536] outline outline-1 rounded-lg my-auto text-xl tracking-widest px-7 py-3 flex flex-row mx-auto space-x-3 align-middle justify-start'
        >
          <div className="self-start">
          {selected?.icon ? selected?.icon : <Chain className="w-7 h-7 flex-0 self-start"/>}
          </div>
          <p className="my-auto align-middle tracking-widest">
          {selected?.value ? selected?.value : <p className="text-xl m-0">
            Connect
          </p>}
          </p>
          
        </motion.button>
      </Dropdown>
    </div>
  );
}

export default Chains;
