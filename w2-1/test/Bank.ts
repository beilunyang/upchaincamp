import { expect } from "chai";
import { ethers } from "hardhat";
import { Bank } from "../typechain-types/Bank";

describe("Bank", () => {
  let bank: Bank;
  before(async () => {
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
    console.log("The contract address is:", bank.address);
  });

  it("owner deposit eth", async () => {
    await bank.deposit({ value: ethers.utils.parseEther("1") });
    expect(await bank.viewDeposit()).to.be.equal(ethers.utils.parseEther("1"));
  });

  it("non-owner deposit eth", async () => {
    const [_, other] = await ethers.getSigners();
    await bank.connect(other).deposit({ value: ethers.utils.parseEther("2") });
    expect(await bank.connect(other).viewDeposit()).to.be.equal(
      ethers.utils.parseEther("2")
    );
  });

  it("owner call withdrawAll", async () => {
    await bank.withdrawAll();
    expect(await ethers.provider.getBalance(bank.address)).to.be.equal(0);
  });

  it("non-owner call withdrawAll", async () => {
    const [_, other] = await ethers.getSigners();
    await expect(bank.connect(other).withdrawAll()).to.be.revertedWith(
      "disabled"
    );
  });

  it("owner withdraw", async () => {
    await bank.withdraw();
    expect(await bank.viewDeposit()).to.be.equal(0);
  });

  it("non-owner withdraw", async () => {
    const [_, other] = await ethers.getSigners();
    await bank.connect(other).withdraw()
    expect(await bank.connect(other).viewDeposit()).to.be.equal(0);
  });
});
