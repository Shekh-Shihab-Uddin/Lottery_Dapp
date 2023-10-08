import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Participants = ({ state, address }) => {
  //s-1
  const [account, setAccount] = useState("No account connected");
  const [registerdParticipants, setRegisterdParticipants] = useState([]);
  
  //s-5
  const [reload, setReload] = useState(false);
  const reloadEffect = () => {
    setReload(!reload);
  };

//s-4
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  //s-2
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      //  console.log(accounts);
     
      setAccountListener(web3.givenProvider);

      setAccount(accounts[0]);
    };
    state.web3 && getAccount();//when I got the state.web3 then call getAccount();
  }, [state, state.web3]);
  
 //s-3 
  useEffect(() => {
    const getParticipants = async () => {
      const { contract } = state;
      const participants = await contract.methods.allParticipants().call();
      console.log(participants);
      const registerdParticipants = await Promise.all(
        participants.map((player) => {
          return player;
        })
      );
      console.log(registerdParticipants);
      setRegisterdParticipants(registerdParticipants);
      
      //s-5
      reloadEffect();
    };
    state.contract && getParticipants();
  }, [state, state.contract, reload]);
  
  
  return (
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
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Pay 1 ether on this contract address to participate: </b> {address}
          </li>
          <li className="list-group-item">
            <b>Registerd Participants </b>:
            <br />
            <br />
            {registerdParticipants.length !== 0 &&
              registerdParticipants.map((name) => <p key={name}>{name}</p>)}
          </li>
        </div>
      </ul>
    </>
  );
};
export default Participants;