import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import WEB3 from "web3";

import "./manager.css";

const Manager = ({state}) => {
    const [account, setAccount]= useState(null);
    const [contBalance, setContBalance] = useState(0);
    const [lotWinner, setLotWinner] = useState(null);

    const setAccountListener = (provider)=>{
        provider.on("accountsChanged",(accounts)=>{
            setAccount(accounts[0]);
        })
    }

useEffect(() => {
    const getAccount = async () => {
        const { web3 } = state;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setAccountListener(web3.givenProvider);
        setAccount(accounts[0]);
      };
      state.web3 && getAccount();
    }, [state, state.web3]);

    const contractBalance = async () => {
        const { contract } = state;
        try {
          const balanceWei = await contract.methods
            .getBalance()
            .call({ from: account });
          console.log(balanceWei);
          const balance =  WEB3.utils.fromWei(balanceWei,"ether");
          setContBalance(balance+" ETH");
        } catch (e) {
            setContBalance("You are not the manager");
        }
      };


  const winner = async ()=>{
    const{contract}= state;
    try{
    await contract.methods.getWinner().send({from:account});
    const lotteryWinner = await contract.methods.winner().call();
    console.log(lotteryWinner);
    setLotWinner(lotteryWinner);
    }catch(err){
        if(err.message.includes("Only owner have access")){
            setLotWinner("You are not the manager");
        }else if(err.message.includes("Insufficient participants")){
            setLotWinner("Need more than 3 participants");
        }else{
            setLotWinner("There is no winner");
        }
    }
    }

return(
    <>
    <nav className="navbar navbar-expand-lg navbar">
        <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to="/" className="nav-link navtext" aria-current="page">
                    HOME
                </NavLink>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    <ul className="list-group" id="list">
        <div className="center">
            <li className="list-group-item" aria-disabled="true">
            connected account: {account}
            </li>
        <br/>
            <li className="list-group-item">
            Winner : {lotWinner}
        <br/>
            <button className="button1" onClick={winner}>Click for draw</button>
            </li>
        <br/>
            <li className="list-group-item">
            Contract Balance: {contBalance}
            <button className="button1" onClick={contractBalance}>Get balance</button>
            </li>
        </div>
    </ul>
    </>
    )
}


export default Manager;