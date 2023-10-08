import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Lottery from "./contracts/Lottery.json";
import getWeb3 from "./getWeb3";

import Error from "./components/Error";
import Home from "./components/Home";
import Manager from "./components/Manager";
import Participants from "./components/Participants";


function App() {

  const [state, setState] = useState({
    web3: null,
    contract: null,
  })

  const [address, setAddress] = useState(null);

  useEffect(()=>{
    const init = async()=>{
      try{
        const web3 = await getWeb3();
        //console.log(web3);
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("contract adress: ", deployedNetwork.address);
        
        //creating instance of the deployed contract
        const instance = new web3.eth.Contract(
          Lottery.abi, 
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);
        setState({web3, contract: instance});

        console.log(instance);
      }catch(err){
        alert("Failed to load web3 or contract.");
        console.log(err);
      }
    };
    init();
  }, []);

  return(
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/manager" element={<Manager state={state}/>}/>
        <Route path="/participants" element={<Participants state={state} address={address}/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </>
  );
  
};

export default App;
