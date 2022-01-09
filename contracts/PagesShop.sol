
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract PagesShop{

    // [External, public] - can every one send tx ETH
    // [pure, view] - readonly, no Gas feed.

    // [payable] can every one send tx ETH
    // [receive], spical function to receive ETH

    address public owner;
    address public funder;
    address[] public mempers;
    uint public countFunders;

    struct EntityUsers {
        address funder;
        uint index;
    }

    EntityUsers[] public users;


    mapping(uint => address) public funders;

    // this constructor will executet onetime after deploy the Contract.
    constructor() {
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


    // change owner sheep the Contract within the Admin.
    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }


    function getFunders() external view returns(address[] memory){

        address[] memory _funders = new address[](countFunders);

        for(uint i = 0; i < countFunders; i++){

            _funders[i] = funders[i];

        }

        return _funders;

    }

    function addFunds() external payable{

        bool isEntity = false;

        address sender = msg.sender;

        for(uint i = 0; i < countFunders; i++){

            if(funders[i] == sender){

                isEntity = true;

            }

        }

        if(!isEntity){

            uint index = countFunders++;
            funders[index] = msg.sender;
        }

    }

    // this function is spical, colled when reseive Eth, it dont have to call the name function to make txs.
    receive () external payable{
        // reseive ETH from ather Account or ather Contracts
    }

    function withdrawBalance(uint amount) external onlyOwner withdraw(amount) {
        payable(msg.sender).transfer(amount);
    }
}

// const instance = await PagesShop.deployed()
// instance.addFunds({from: accounts[2], value:"2000000000000000000"})
// instance.addFunds({from: accounts[3], value:"2000000000000000000"})
// instance.owner()
// instance.funders(0)
// instance.getFunders()
// instance.withdrawBalance("100000000000000000", {from: accounts[3]}) // error, onlyowner
// instance.withdrawBalance("100000000000000000", {from: accounts[0]}) // success, onlyowner
// instance.withdrawBalance("2000000000000000000") // error, can not withdraw more then 1 eth