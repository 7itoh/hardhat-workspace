import { run, ethers } from 'hardhat'

async function main():Promise<void> {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(():void => process.exit(0))
  .catch((err):Error => {
    console.error(err);
    process.exit(1);
  })