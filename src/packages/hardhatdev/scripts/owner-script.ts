import { run, ethers } from 'hardhat'

async function main():Promise<void> {
  const Owner = await ethers.getContractFactory("Owner");
  const owner = await Owner.deploy();
  await owner.deployed();

  console.log("Owner deployed to:", owner.address);
}

main()
  .then(():void => process.exit(0))
  .catch((err):Error => {
    console.error(err);
    process.exit(1);
  })