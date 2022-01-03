import { task, HardhatUserConfig } from 'hardhat/config'
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types'
import dotENV from 'dotenv';

dotENV.config();
const _api = typeof(process.env.API_URL) === 'string' ? process.env.API_URL : '';
const _account = typeof(process.env.PRIVATE_KEY) === 'string' ? process.env.PRIVATE_KEY : '';

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
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${_api}`,
      accounts: [`${_account}`],
      gasPrice: 30000000
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