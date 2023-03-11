const { ethers } = require("hardhat");

(async () => {
  const Counter = await ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();
  await counter.deployed()
  console.log('Counter Contract has deployed!')
})();
