// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Owned{

    address public owner;

    // this constructor will executet onetime after deploy the Contract.
    constructor() {
        owner = msg.sender;

    }

}