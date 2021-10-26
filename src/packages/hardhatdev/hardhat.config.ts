import { task, HardhatUserConfig } from 'hardhat/config'
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types'

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import '@typechain/hardhat/dist/type-extensions'
import 'tsconfig-paths/register'
import '@nomiclabs/hardhat-web3'

task("accounts", "Prints the list of accounts", async (args: HardhatArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  paths: {
    sources: './contracts',
  },
  networks: {
    localhost: {
      chainId: 31337,
    },
    optimistic: {
      url: 'http://ops_l2geth_1:8545',
      accounts: { mnemonic: 'test test test test test test test test test test test junk' },
      gasPrice: 15000000,
    }
  },
  solidity: {
    version: '0.8.4',
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"]
        }
      }
    }
  },
  typechain: {
    outDir: './typechained',
    target: 'ethers-v5',
  }
}

export default config