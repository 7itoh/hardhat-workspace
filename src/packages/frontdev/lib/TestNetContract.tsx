import { ethers, providers } from 'ethers'
// import { abi, bytecode, contractName } from '../../hardhat_dev/artifacts/contracts/Greeter.sol/Greeter.json'
import { abi, bytecode, contractName } from '../artifacts/Greeter.json'

class TestNetContract {
    private _abi: any;
    private _bytecode: string;
    private _address: string;
    private _provider: any;
    private _signer: any;
    private _factory: any;

    constructor() {
        this._provider = new providers.StaticJsonRpcProvider(process.env.LOCALNET_CHAIN);
        this._address = '';
        this._abi = abi;
        this._bytecode = bytecode;
        this._signer = this._provider.getSigner();
        this._factory = new ethers.ContractFactory(this._abi, this._bytecode, this._signer);
     }

    private async deployContractToTestNet(): Promise<void> {
        const deployContract = await this._factory.deploy(contractName);

        this._address = deployContract.address;
        console.log(deployContract, this._address);

        const net = await this._signer.provider.getNetwork();
        console.log(net.chainId);
    }

    private async getTestNetContract(): Promise<ethers.Contract> {
        const contract = new ethers.Contract(this._address, this._abi, this._provider);
        return await contract
    }

    public onDeployContractButton(): void {
        this.deployContractToTestNet();
    }

    public dispTestNetContractButton(): void {
        const contract = this.getTestNetContract();
        console.log(contract, this._address);
    }
}

export default TestNetContract