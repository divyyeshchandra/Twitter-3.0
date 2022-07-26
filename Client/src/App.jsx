import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import {ethers} from "ethers"

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  
  async function connectWallet() {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let accounts=await provider.send("eth_requestAccounts");
      setCurrentAccount(accounts);
      setCorrectNetwork(true);
      let signer = provider.getSigner();
      console.log("Account address:", await signer.getAddress());
  }

  return (

    <div>
    {currentAccount === '' ? (
      <button
      className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={connectWallet}
      >
      Connect Wallet
      </button>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Rinkeby Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>
  );
}

export default App
