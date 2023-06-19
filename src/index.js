import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as fcl from "@blocto/fcl"
import App from './App';
import reportWebVitals from './reportWebVitals';

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org") // 
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // use Blocto testnet wallet

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




