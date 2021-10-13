import { expect } from 'chai'
import { ethers } from 'hardhat'

describe("Greeter", ():void => {
  it("Should return the new greeting once it's changed", async ():Promise<void> => {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();
    
        expect(await greeter.greet()).to.equal("Hello, world!");
    
        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        await setGreetingTx.wait();    
        expect(await greeter.greet()).to.equal("Hola, mundo!");
      });
})