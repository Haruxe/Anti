import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Layout, Tabs } from "antd";
// import "./style.css"
// import "antd/dist/antd.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
const { Header } = Layout;

const App = () => {
  
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div id='page'>
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Router>
          <Header>
            <Navbar />
          </Header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      </Layout>
    </div>
  );

}

export default App;
