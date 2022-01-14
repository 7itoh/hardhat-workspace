import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CALLCONTRACTMETHOD, MINIMUM, BALANCE, REQUEST, APPROVERSCOUNT, ADDRESS, REQUESTCOUNT, INFOCREATECONTRACT } from './types/hooks.types'

export const useFetchInfoCreateContract = (callContract: CALLCONTRACTMETHOD): INFOCREATECONTRACT => {
  
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
