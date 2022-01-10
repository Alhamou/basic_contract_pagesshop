// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// It's a way for designer to say that
// "any child of the abstract contract has to implmenet speicifed methods"

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