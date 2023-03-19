import { ethers } from "hardhat";

async function main() {
  const Teacher = await ethers.getContractFactory("Teacher");
  const teacher = await Teacher.deploy();

  await teacher.deployed();

  console.log(
    'teacher deployed successfully. The address is:', teacher.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
