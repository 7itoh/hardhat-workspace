import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACTADDRESS, WEB3API, SIGNER, ABI, CALLSENDMETHOD } from './types/hooks.types'

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
