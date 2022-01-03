import { expect } from 'chai'
import { ethers } from 'hardhat'

interface MARKETPLACETYPES {
  address: string,
  deployed: () => void,
  getOwner?: () => void | undefined,
}

let marketplace: any;

beforeEach(async () => {
  const Marketplace = await ethers.getContractFactory("Marketplace");
  marketplace = await Marketplace.deploy();
  await marketplace.deployed();
  console.log(marketplace.address); 
})

describe('Who is Marketplace Contract Owner .', () => {
  it('Get Owner', async() => {
    const resoponse = await marketplace.getOwner!();
    expect(await marketplace.getOwner!()).to.equal(resoponse);
    expect(marketplace.address).to.be.ok;
  })
})