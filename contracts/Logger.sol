// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// should the child use all methuds.
// this abstract is as a design Roles for the Contract.

abstract contract Logger{

    uint num;

    constructor(){
        num = 1000;
    }

    function emitLogger() external pure virtual returns(bytes32){}

    function getNum() external view returns(uint){
        return num;
    }
}