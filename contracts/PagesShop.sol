
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract PagesShop{

    // [External, public] - can every one send tx ETH
    // [pure, view] - readonly, no Gas feed.

    // [payable] can every one send tx ETH
    // [receive], spical function to receive ETH

    address public owner;
    address[] public  funders;

    // this constructor will executet onetime after deploy the Contract.
    constructor() payable {
        owner = msg.sender;
    }

    // modifier, check only Owner access.
    modifier onlyOwner{

        require(
            msg.sender == owner,
            "Only Owner cann access this function to"
        );

        // alse, continue the executing.
        _;
    }
    
    // modifier with paramiter, withdraw use case.
    modifier withdraw (uint amount){

        require(
            amount <= 1000000000000000000,
            "can not withdraw more the 1 Ether."
        );

        // alse, continue the executing.
        _;
    }


    function getFunders() external view returns(address[] memory){
        return funders;
    }

    function addFunds() external payable{
        funders.push(msg.sender);
    }

    // this function is spical, colled when reseive Eth, it dont have to call the name function to make txs.
    receive () external payable{
        // reseive ETH from ather Account or ather Contracts
    }

    function withdrawBalance(uint amount) external onlyOwner {
        payable(msg.sender).transfer(amount);
    }
}