import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

type MINIMUM = string;
type BALANCE = string;
type REQUEST = [];
type APPROVERSCOUNT = number;
type ADDRESS = string;
type REQUESTCOUNT = number;

interface INFOCREATECONTRACT {
  minimum: MINIMUM;
  balance: BALANCE;
  request: REQUEST;
  approversCount: APPROVERSCOUNT;
  managerAddress: ADDRESS;
  requestCount: REQUESTCOUNT;
}

export const useFetchInfoCreateContract = (callContract: any): INFOCREATECONTRACT => {
  
  const [ minimum, setMinimum ] = useState<MINIMUM>('');
  const [ balance, setBalance ] = useState<BALANCE>('');
  const [ request, setRequest ] = useState<REQUEST>([]);
  const [ approversCount, setApproversCount ] = useState<APPROVERSCOUNT>(0);
  const [ managerAddress, setManagerAddress ] = useState<ADDRESS>('');
  const [ requestCount, setRequestCount ] = useState<number>(0);

 
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
