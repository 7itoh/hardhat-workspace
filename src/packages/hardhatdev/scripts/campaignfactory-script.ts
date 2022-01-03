import { ethers } from "hardhat";

async function main(): Promise<void> {
  const Campaign = await ethers.getContractFactory("CampaignFactory");
  const campaign = await Campaign.deploy();
  await campaign.deployed();

  console.log("CampaignFactory Deployed", campaign.address);
}

main()
  .then((): void => process.exit(0))
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  })
