/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Campaign, CampaignInterface } from "../Campaign";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minimum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creater",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "approverRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "approversCount",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "createRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "finalizeRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinimumContribution",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestsCount",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSummary",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "bool",
        name: "complete",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "approvalCount",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001085380380620010858339818101604052810190620000379190620000b5565b80600360016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600481905550505062000168565b600081519050620000988162000134565b92915050565b600081519050620000af816200014e565b92915050565b60008060408385031215620000c957600080fd5b6000620000d9858286016200009e565b9250506020620000ec8582860162000087565b9150509250929050565b600062000103826200010a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200013f81620000f6565b81146200014b57600080fd5b50565b62000159816200012a565b81146200016557600080fd5b50565b610f0d80620001786000396000f3fe60806040526004361061009c5760003560e01c806381d12c581161006457806381d12c581461018c57806382fde093146101cd5780638a9cfd55146101f8578063c7d2623c14610221578063d7bb99ba1461024a578063f84038b1146102545761009c565b806303441006146100a15780630a144391146100ca5780633410452a146101075780634051ddac14610132578063481c6a7514610161575b600080fd5b3480156100ad57600080fd5b506100c860048036038101906100c39190610a5e565b61027f565b005b3480156100d657600080fd5b506100f160048036038101906100ec91906109ce565b61037d565b6040516100fe9190610b17565b60405180910390f35b34801561011357600080fd5b5061011c61039d565b6040516101299190610bfa565b60405180910390f35b34801561013e57600080fd5b506101476103b3565b604051610158959493929190610ba7565b60405180910390f35b34801561016d57600080fd5b50610176610411565b6040516101839190610afc565b60405180910390f35b34801561019857600080fd5b506101b360048036038101906101ae9190610a5e565b610437565b6040516101c4959493929190610b32565b60405180910390f35b3480156101d957600080fd5b506101e261052f565b6040516101ef9190610bfa565b60405180910390f35b34801561020457600080fd5b5061021f600480360381019061021a91906109f7565b610542565b005b34801561022d57600080fd5b5061024860048036038101906102439190610a5e565b610691565b005b6102526107ef565b005b34801561026057600080fd5b5061026961088f565b6040516102769190610b8c565b60405180910390f35b600360019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102d957600080fd5b60006001600083815260200190815260200160002090506002600360009054906101000a900460ff1661030c9190610c87565b60ff168160020160159054906101000a900460ff1660ff161161032e57600080fd5b6001600083815260200190815260200160002060020160149054906101000a900460ff161561035c57600080fd5b60018160020160146101000a81548160ff0219169083151502179055505050565b60026020528060005260406000206000915054906101000a900460ff1681565b60008060009054906101000a900460ff16905090565b60008060008060006004544760008054906101000a900460ff16600360009054906101000a900460ff16600360019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16945094509450945094509091929394565b600360019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160205280600052604060002060009150905080600001805461045a90610d4f565b80601f016020809104026020016040519081016040528092919081815260200182805461048690610d4f565b80156104d35780601f106104a8576101008083540402835291602001916104d3565b820191906000526020600020905b8154815290600101906020018083116104b657829003601f168201915b5050505050908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160149054906101000a900460ff16908060020160159054906101000a900460ff16905085565b600360009054906101000a900460ff1681565b600360019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461059c57600080fd5b60006001600080600081819054906101000a900460ff16809291906105c090610db2565b91906101000a81548160ff021916908360ff16021790555060ff168152602001908152602001600020905083816000019080519060200190610603929190610899565b50828160010181905550818160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008160020160146101000a81548160ff02191690831515021790555060008160020160156101000a81548160ff021916908360ff16021790555050505050565b6000600160008381526020019081526020016000209050600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166106fe57600080fd5b8060030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561075757600080fd5b60018160030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555080600201601581819054906101000a900460ff16809291906107d290610db2565b91906101000a81548160ff021916908360ff160217905550505050565b60045434116107fd57600080fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506003600081819054906101000a900460ff168092919061087490610db2565b91906101000a81548160ff021916908360ff16021790555050565b6000600454905090565b8280546108a590610d4f565b90600052602060002090601f0160209004810192826108c7576000855561090e565b82601f106108e057805160ff191683800117855561090e565b8280016001018555821561090e579182015b8281111561090d5782518255916020019190600101906108f2565b5b50905061091b919061091f565b5090565b5b80821115610938576000816000905550600101610920565b5090565b600061094f61094a84610c3a565b610c15565b90508281526020810184848401111561096757600080fd5b610972848285610d0d565b509392505050565b60008135905061098981610ea9565b92915050565b600082601f8301126109a057600080fd5b81356109b084826020860161093c565b91505092915050565b6000813590506109c881610ec0565b92915050565b6000602082840312156109e057600080fd5b60006109ee8482850161097a565b91505092915050565b600080600060608486031215610a0c57600080fd5b600084013567ffffffffffffffff811115610a2657600080fd5b610a328682870161098f565b9350506020610a43868287016109b9565b9250506040610a548682870161097a565b9150509250925092565b600060208284031215610a7057600080fd5b6000610a7e848285016109b9565b91505092915050565b610a9081610cb8565b82525050565b610a9f81610cca565b82525050565b6000610ab082610c6b565b610aba8185610c76565b9350610aca818560208601610d1c565b610ad381610e98565b840191505092915050565b610ae781610cf6565b82525050565b610af681610d00565b82525050565b6000602082019050610b116000830184610a87565b92915050565b6000602082019050610b2c6000830184610a96565b92915050565b600060a0820190508181036000830152610b4c8188610aa5565b9050610b5b6020830187610ade565b610b686040830186610a87565b610b756060830185610a96565b610b826080830184610aed565b9695505050505050565b6000602082019050610ba16000830184610ade565b92915050565b600060a082019050610bbc6000830188610ade565b610bc96020830187610ade565b610bd66040830186610aed565b610be36060830185610aed565b610bf06080830184610a87565b9695505050505050565b6000602082019050610c0f6000830184610aed565b92915050565b6000610c1f610c30565b9050610c2b8282610d81565b919050565b6000604051905090565b600067ffffffffffffffff821115610c5557610c54610e69565b5b610c5e82610e98565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000610c9282610d00565b9150610c9d83610d00565b925082610cad57610cac610e0b565b5b828204905092915050565b6000610cc382610cd6565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b83811015610d3a578082015181840152602081019050610d1f565b83811115610d49576000848401525b50505050565b60006002820490506001821680610d6757607f821691505b60208210811415610d7b57610d7a610e3a565b5b50919050565b610d8a82610e98565b810181811067ffffffffffffffff82111715610da957610da8610e69565b5b80604052505050565b6000610dbd82610d00565b915060ff821415610dd157610dd0610ddc565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b610eb281610cb8565b8114610ebd57600080fd5b50565b610ec981610cf6565b8114610ed457600080fd5b5056fea2646970667358221220610879e764fabac0cb702473b606e9b4520c09c5efd991e6fd1cf23327f314d764736f6c63430008040033";

export class Campaign__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    minimum: BigNumberish,
    creater: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Campaign> {
    return super.deploy(minimum, creater, overrides || {}) as Promise<Campaign>;
  }
  getDeployTransaction(
    minimum: BigNumberish,
    creater: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(minimum, creater, overrides || {});
  }
  attach(address: string): Campaign {
    return super.attach(address) as Campaign;
  }
  connect(signer: Signer): Campaign__factory {
    return super.connect(signer) as Campaign__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CampaignInterface {
    return new utils.Interface(_abi) as CampaignInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Campaign {
    return new Contract(address, _abi, signerOrProvider) as Campaign;
  }
}