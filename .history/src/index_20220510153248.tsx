import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MoralisProvider } from "react-moralis";
// import { MoralisDappProvider } from "./MoralisDappProvider/MoralisDappProvider"
import App from './App';
import reportWebVitals from './reportWebVitals';

// const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
// const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
    return (
      <MoralisProvider initializeOnMount={false}>
        <App/>
      </MoralisProvider>
    );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Application/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
