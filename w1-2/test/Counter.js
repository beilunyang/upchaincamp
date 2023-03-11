const { ethers } = require("hardhat");
const { expect } = require('chai');

describe('Counter', () => {
  let counter;
  let owner;
  let otherAccount;
  before(async () => {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    otherAccount = accounts[1];
    const Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy();
  })
  it ('Should set the right owner', async () => {
    expect(await counter.owner(), owner);
  })

  it('Should succeed when the owner calls count', async () => {
    expect(await counter.connect(owner).count()).to.equal(0);
  });

  it('Should fail when the non-owner calls count', async () => {
    await expect(counter.connect(otherAccount).count()).to.be.revertedWith('you do not have permission');
  });
});
