import campaignContractAbi from '../artifacts/Campaign.json';
import factoryContractAbi from '../artifacts/CampaignFactory.json';

export const factoryAddress: string = process.env.NEXT_PUBLIC_TESTNET_DEPLOYED_ADDRESS;
export const factoryAbi = factoryContractAbi.abi;
export const campaignAbi = campaignContractAbi.abi;
