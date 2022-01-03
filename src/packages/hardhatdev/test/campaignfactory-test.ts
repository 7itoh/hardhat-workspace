import { expect } from 'chai';
import { ethers } from 'hardhat';

let campaignFactory: any;
let newCampaignFactory: any;
let campaign: any;

// let address = {
//   owner: '',
//   manager: '',
//   contributor: '',
// }
const provider = ethers.provider;
let ownerAddress: string;
let managerAddress: string;
let approverAddress: string;
// let accountManager: string = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

beforeEach(async () => {
  // const [owner, addr1, addr2] = await ethers.getSigners();
  const [owner, manager, addr2] = await ethers.getSigners();
  ownerAddress = owner.address;
  managerAddress = manager.address;
  approverAddress = addr2.address;

  // Campaign Factory Contract
  const NewCampaign = await ethers.getContractFactory("CampaignFactory");
  campaignFactory = await NewCampaign.deploy();
  await campaignFactory.deployed();
  // Campaign Contract
  const Campaign = await ethers.getContractFactory("Campaign");
  campaign = await Campaign.deploy(10, managerAddress);
  await campaign.deployed();
  console.log(campaign.address);
})

describe('Test Campaign Factory Contract', () => {
  it('Create a New Campaign', async() => {
    newCampaignFactory = await campaignFactory.createCampaign(0);
    console.log(newCampaignFactory);
    expect(newCampaignFactory).to.be.ok;
  })
  it('How many Create Contract and Show the Contract Address', async() => {
    newCampaignFactory = await campaignFactory.createCampaign(0);
    const resoponse = await campaignFactory.getDeployedCampaigns!();
    console.log(`Deployed New Campaign Contract is ${resoponse[0]}`);
    expect(resoponse.length).to.equal(1);
  })
})

describe('Test Campaign Contract', () => {
  it('Who is Campaign Contract Manager', async() => {
    const manager = await campaign.manager();
    expect(managerAddress).to.equal(manager);
    // const minimumContribution = await campaign.getMinimumContribution!();
    // console.log(minimumContribution);
    // expect(minimumContribution.length).to.equal(undefined);
  })
  it('Entry The Contribution', async() => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const amount = await ethers.utils.parseEther('11');
    await campaign.connect(addr2).contribute({ value: amount });
    const isContributor = await campaign.approvers(addr2.address);
    expect(!isContributor).not.to.be.true;
  })
  it('requires a minimum contribution', async() => {
    try {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const amount = await ethers.utils.parseEther('11');
      await campaign.connect(addr2).contribute({ value: amount });
    } catch(err) {
      console.log(err);
    }
  })
  it('allows a manager to make payment request', async() => {
    const [owner, manager, addr2] = await ethers.getSigners();
    await campaign.connect(manager).createRequest('Buy Batteries', 100, addr2.address);
    const request = await campaign.requests(0);
    expect(request.description).to.equal('Buy Batteries');
  })
  it('process requests', async() => {
    const [owner, manager, addr2] = await ethers.getSigners();
    let balanceBefore: any = await provider.getBalance(addr2.address);
    let managerBefore: any = await provider.getBalance(manager.address);
    balanceBefore = ethers.utils.formatEther(balanceBefore);
    managerBefore = ethers.utils.formatEther(managerBefore);
    console.log(balanceBefore.toString());
    console.log(managerBefore.toString());

    const amountA = await ethers.utils.parseEther('11');
    await campaign.connect(addr2).contribute({ value: amountA });
    const isContributor = await campaign.approvers(addr2.address);
    expect(isContributor).to.be.true;
    
    const amountB = await ethers.utils.parseEther('5');
    await campaign.connect(manager).createRequest('A', amountB, addr2.address)
    await campaign.connect(addr2).approverRequest(0);
    await campaign.connect(manager).finalizeRequest(0);
    let balanceAfter: any = await provider.getBalance(addr2.address);
    let managerAfter: any = await provider.getBalance(manager.address);
    balanceAfter = ethers.utils.formatEther(balanceAfter);
    managerAfter = ethers.utils.formatEther(managerAfter);
    console.log(balanceAfter.toString());
    console.log(managerAfter.toString());

    const isComplete = await campaign.requests(0);
    expect(isComplete.complete).to.be.true;
  })
  it('Get Summary', async() => {
    const [owner, manager, addr2] = await ethers.getSigners();
    const summary = await campaign.connect(manager).getSummary();
    console.log(summary);
    const count = await campaign.connect(manager).getRequestsCount();
    console.log(count);
    expect(summary).to.be.ok;
  })
})