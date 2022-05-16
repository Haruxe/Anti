import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Layout, Tabs } from "antd";
// import "./style.css"
// import "antd/dist/antd.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Account from "./components/Account/Account";
import Chains from "./Chains/Chains";
import NotFound from "./pages/NotFound";
const { Header } = Layout;

const App = ({isServerInfo}) => {
  
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div id='page'>
      <Router>
      <Header>
        {/* <Chains /> */}
        <Account />
      </Header>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
