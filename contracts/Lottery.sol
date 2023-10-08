//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery{
    address payable[] public participants;
    address manager;
    address payable public winner;

 constructor()
    {
        manager=msg.sender; //global variable. this will assign the address 
        //of the account that deploys the contract to the manager variable.
    }

    receive() external payable{
        require(msg.value == 1000000000000000000);
        require(msg.sender != manager);
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        require(manager == msg.sender,"Only owner have access");
        return address(this).balance;
    }

//get a random number
    function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,participants.length)));
    }

    function getWinner() public {
        require(manager==msg.sender,"Only owner have access");
        require(participants.length>=3, "Insufficient participants");

        uint win  = random();
//take the remainder by deviding with the participants number so that get the index number in range
        uint index = win%participants.length;
        winner = participants[index];//select participants of that indexx as winner
        winner.transfer(getBalance());//transfer the contract balance to winner
        participants = new address payable[](0);//delete all the participants
    }

    function allParticipants() public view returns(address payable[] memory){
        return participants;
    }


}

//Contract address: 0x08F5C867E79E350B6EC6E7045C65b4F170ea5C9D