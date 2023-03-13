import { ethers } from "hardhat";

async function main() {
  const Bank = await ethers.getContractFactory("Bank");

  const bank = await Bank.deploy();

  await bank.deployed();

  console.log("Bank deploy successfully. Address is:", bank.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
