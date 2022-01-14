import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, providers } from 'ethers';
import {
  SIGNER,
  PROVIDER,
  ABI,
  WEB3API,
  CONTRACTADDRESS,
  CALLCONTRACTMETHOD,
  CALLSENDMETHOD,
  USERADDRESS,
  USERADDRESSTYPES,
  CONTRACTSLISTTYPE,
  USECONTRACTLIST,
  MINIMUM,
  BALANCE,
  REQUEST,
  APPROVERSCOUNT,
  ADDRESS,
  REQUESTCOUNT,
  INFOCREATECONTRACT,
  REQUESTTYPES,
  FETCHREQUESTLIST
} from './types/hooks.types'

export const useLoadProvider = () => {
  const [signer, setSigner] = useState<SIGNER>(undefined);
  const [web3Api, setWeb3Api] = useState<WEB3API>({ provider: null, web3: null });

  useEffect(() => {
    const loadProvider = async () => {
      let provider: PROVIDER;
      try {
        provider = await detectEthereumProvider();
        if (provider) {
          provider.request({
            method: "eth_requestAccounts"
          });
          setWeb3Api({
            provider,
            web3: new ethers.providers.Web3Provider(provider),
          })
          setSigner(await new providers.Web3Provider(provider).getSigner());
        } else {
          console.log('Please Install MetaMask');
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadProvider();
  }, [])

  return { signer, web3Api }
}

export const useFetchCallSendMethod = (address: CONTRACTADDRESS, signer: SIGNER, web3Api: WEB3API, abi: ABI): CALLSENDMETHOD => {
  const [callContract, setCallContract] = useState({ call: null });
  const [sendContract, setSendContract] = useState({ send: null });
  
  useEffect(() => {
    const deploySendFactory = async () => {
      try {
        setSendContract({ send: new ethers.Contract(address, abi, signer) });
      } catch (err) {
        console.log(err);
      }
    }
    deploySendFactory();
  }, [address, signer, abi ])
  
  useEffect(() => {
    const deployCallContractFactory = async () => {
      try {
        setCallContract({ call: new ethers.Contract(address, abi, web3Api.web3) });
      } catch (err) {
        console.log(err);
      }
    }
    deployCallContractFactory();
  }, [address, web3Api.web3, abi])
  
  return { callContract, sendContract }
}

export const useSetUserAddress = (web3Api: WEB3API): USERADDRESSTYPES => {
  const [userAddress, setUserAddress] = useState<USERADDRESS>('');

  useEffect(() => {
    const setUseContractUserAddress = async () => {
      try {
        setUserAddress(await web3Api.provider.selectedAddress);
      } catch (err) {
        console.log(err);
      }
    }
    setUseContractUserAddress();
  }, [web3Api])

  return { userAddress }
}

export const useFetchContractsList = (callContract: CALLCONTRACTMETHOD): USECONTRACTLIST => {
  const [contractsList, setContractList] = useState<CONTRACTSLISTTYPE>(['']);

  useEffect(() => {
    const fetchInitialInfo = async () => {
      try {
        setContractList(await callContract.call.getDeployedCampaigns());
      } catch (err) {
        console.log(err);
      }
    }
    fetchInitialInfo();
  }, [callContract])

  return { contractsList }
}

export const useShowContractDetail = (callContract: CALLCONTRACTMETHOD): INFOCREATECONTRACT => {
  
  const [ minimum, setMinimum ] = useState<MINIMUM>('');
  const [ balance, setBalance ] = useState<BALANCE>('');
  const [ request, setRequest ] = useState<REQUEST>([]);
  const [ approversCount, setApproversCount ] = useState<APPROVERSCOUNT>(0);
  const [ managerAddress, setManagerAddress ] = useState<ADDRESS>('');
  const [ requestCount, setRequestCount ] = useState<REQUESTCOUNT>(0);

  useEffect(() => {
    const fetchInfoCreateContract = async() => {
      try {
        const summary = await callContract.call.getSummary();
        setMinimum(ethers.utils.formatEther(summary[0]));
        setBalance(ethers.utils.formatEther(summary[1]));
        setRequest(summary[2]);
        setApproversCount(summary[3]);
        setManagerAddress(summary[4]);
      } catch(err) {
        console.log(err);
      }
    }
    fetchInfoCreateContract();
  }, [callContract])

  useEffect(() => {
    const fetchRequestCount = async () => {
      try {
        setRequestCount(await callContract.call.getRequestsCount());
      } catch (err) {
        console.log(err);
      }
    }
    fetchRequestCount();
  }, [callContract])

  return { minimum, balance, request, approversCount, managerAddress, requestCount }
}

export const useFetchRequestList = (requestCount: REQUESTCOUNT, callContract: CALLCONTRACTMETHOD): FETCHREQUESTLIST => {
  const [requestListItems, setRequestListItems] = useState<REQUESTTYPES[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      let requestsList: REQUESTTYPES[] = new Array();
      let requestField: REQUESTTYPES = {
        index: 0,
        description: '',
        recipient: '',
        value: '',
        approversCount: ''
      }
      try {
        for (let i = 0; i < requestCount; i++) {
          const request = await callContract.call.requests(i);
          requestField = {
            index: i + 1,
            description: request.description,
            recipient: request.recipient,
            value: ethers.utils.formatEther(request.value),
            approversCount: request.approvalCount,
          }
          requestsList.push(requestField);
        }
        setRequestListItems(requestsList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchList();
  }, [requestCount])

  return { requestListItems }
}