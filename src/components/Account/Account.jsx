import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
import {motion} from 'framer-motion';
const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "#202020",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "#202020",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account) {
    return (
      <>
        <motion.button onClick={() => setIsAuthModalVisible(true)} whileHover={{scale: 1.05}} className='bg-[#181818] align-middle outline-white outline outline-1 rounded-lg px-2 h-3/4 my-auto'>
          <p className="p-0 m-0">Connect Your Wallet!</p>
        </motion.button >
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div style={styles.account} className='outline outline-1 outline-[#343536] align-middle rounded-2xl my-auto' onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }} className='my-auto'>
          {getEllipsisTxt(account, 6)}
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
            
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;