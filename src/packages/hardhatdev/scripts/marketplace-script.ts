import { ethers } from "hardhat";

async function main(): Promise<void> {
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed();

  console.log("Market Place Deployed", marketplace.address);
}

main()
  .then((): void => process.exit(0))
  .catch((err): Error => {
    console.log(err);
    process.exit(1);
  })