// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.16;

import "./Score.sol";

contract Teacher {
  address public scoreAddress;

  constructor() {
    // create方式创建合约
    // Score scoreContract = new Score();
    // scoreAddress = address(scoreContract);
    // create2方式, solidity 0.8.0新语法 
    Score scoreContract = new Score{salt: '123'}();
    scoreAddress = address(scoreContract);
    console.log('scoreAddress is:', scoreAddress);
  }

  function modify(address student, uint score) public {
    IScore(scoreAddress).modify(student, score);    
  }

  function getScore(address student) view public returns (uint) {
    bytes4 selector = bytes4(keccak256('scores(address)'));
    (bool success, bytes memory score) = scoreAddress.staticcall(abi.encodeWithSelector(selector, student)); 
    require(success, "call getScore failed");
    return abi.decode(score, (uint));
    // (uint score) = IScore(scoreAddress).scores(student);
    // return score;
  }
}