import { expect } from 'chai'
import { ethers } from 'hardhat'

let greeter: any;

beforeEach(async () => {
  const Greeter = await ethers.getContractFactory("Greeter");
  greeter = await Greeter.deploy();
  await greeter.deployed();
})

describe("Greeter", ():void => {
  it("Should return the new greeting once it's changed", async ():Promise<void> => {

        expect(await greeter.greet()).to.equal("Hello, world!");
        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
        await setGreetingTx.wait();    
        expect(await greeter.greet()).to.equal("Hola, mundo!");
      });
})