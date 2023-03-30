import { ethers } from "hardhat";

function expandTo18Decimals(value: number) {
  return ethers.BigNumber.from(value).mul(ethers.BigNumber.from(10).pow(18));
}

async function main() {
  const ERC20 = await ethers.getContractFactory("ToumaToken");
  const touma = await ERC20.deploy('touma', 'tm', expandTo18Decimals(10000));

  await touma.deployed();

  console.log(
    `Touma is deployed, The address is ${touma.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
