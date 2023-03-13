// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;

contract Bank {
  address payable owner;

  mapping (address => uint) public deposits;

  constructor() payable {
    owner = payable(msg.sender);
  }

  receive() external payable {
    deposits[msg.sender] += msg.value;
  }

  function withdraw() public {
     deposits[msg.sender] = 0;
     (bool success,) = msg.sender.call{value: deposits[msg.sender]}("");
     require(success, "withdraw eth fail");
  }

  function withdrawAll() public {
    require(msg.sender == owner, 'disabled');
    uint balance = address(this).balance;
    (bool success,) = msg.sender.call{value: balance}("");
    require(success, "withdrawAll eth fail");
  }

  function deposit() public payable {
    deposits[msg.sender] += msg.value;
  }

  function viewDeposit() public view returns (uint) {
    return deposits[msg.sender];
  }
}
