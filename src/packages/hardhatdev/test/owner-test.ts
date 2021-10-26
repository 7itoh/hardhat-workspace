import { expect } from 'chai'
import { ethers } from 'hardhat'

interface OWNER{
  address: any
  deployed: () => void,
  getOwner?: () => void | undefined,
  setOwner?: () => void | undefined,
  setEntry?: () => void | undefined,
  getPlayers?: () => void | undefined,
}
let owner: any;

beforeEach(async () => {
  const Owner = await ethers.getContractFactory("Owner");
  owner = await Owner.deploy();
  await owner.deployed();
  // console.log(ethers);
})

describe('Owner Contract', () => {
  it('get owner', async() => {
    const resoponse = await owner.getOwner!();
    await owner.setOwner!();
    expect(await owner.getOwner!()).to.equal(resoponse)
    expect(owner.address).to.be.ok
  })

  it('Entry the Lottery Players', async() => {
    let player = null;
    try {
      player = await owner.getPlayers!();
      console.log(player[0]);

      const amount = await ethers.utils.parseEther('0.2');
      await owner.setEntry({ value: amount });
      player = await owner.getPlayers!();
      console.log(player[0]);
      await owner

      expect(await owner.getOwner!()).to.be.equal(player[0]);

    } catch (err) {
      console.log(err);
    }
  })

  it('Pick Winner', async() => {
    let player = null;
    try {
      const isOwner = await owner.getOwner();
      console.log(isOwner);
      const amount = await ethers.utils.parseEther('0.2');
      await owner.setEntry({ value: amount });
      player = await owner.getPlayers();
      expect(player[0]).to.be.equal(isOwner);

      await owner.pickWinner();

    } catch (err) {
      console.log(err);
    }
  })
})