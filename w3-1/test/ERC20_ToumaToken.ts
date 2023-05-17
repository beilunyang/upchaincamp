import { ethers } from "hardhat"
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';

describe('ToumaToken', () => {
  async function deployTokenFixture() {
    const ToumaToken = await ethers.getContractFactory('ToumaToken');
    const toumaToken = await ToumaToken.deploy('touma', 'tm', 1000000); 
    await toumaToken.deployed();
    console.log(
      "ToumaToken deploy successfully. The address is:",
      toumaToken.address
    );
    const [owner, addr1, addr2] = await ethers.getSigners();
    return {
      toumaToken,
      owner,
      addr1,
      addr2,
    }
  }

  it('should assign total supply to owner', async () => {
    const { toumaToken, owner } = await loadFixture(deployTokenFixture);
    expect(await toumaToken.balanceOf(owner.address)).to.equal(await toumaToken.totalSupply());
  })

  it('should transfer token between accounts', async () => {
    const { toumaToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
    await expect(toumaToken.transfer(addr1.address, 100)).to.changeTokenBalances(toumaToken, [owner, addr1], [-100, 100]); 
    await expect(toumaToken.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(toumaToken, [addr1, addr2], [-50, 50]);
  });

  it ('should approve one account to transfer token', async () => {
    const { toumaToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
    await toumaToken.approve(addr1.address, 1000);
    await expect(toumaToken.connect(addr1).transferFrom(owner.address, addr2.address, 600)).to.changeTokenBalances(toumaToken, [owner, addr2], [-600, 600]);
    await expect(toumaToken.connect(addr1).transferFrom(owner.address, addr2.address, 400)).to.changeTokenBalances(toumaToken, [owner, addr2], [-400, 400]);
    await expect(toumaToken.connect(addr1).transferFrom(owner.address, addr2.address, 1)).to.be.revertedWith('Insufficient allowance balance');
  });
})