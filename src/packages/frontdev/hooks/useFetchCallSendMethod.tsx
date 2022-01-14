import { useState, useEffect } from 'react';
import { factoryAbi } from '../utils/provider.index';
import { ethers } from 'ethers';

interface WEBTHREEAPITYPES {
  provider: any | null,
  web3: any | null
}

interface CALLSENDMETHOD {
  callContract: any;
  sendContract: any;
}

export const useFetchCallSendMethod = (address: string, signer: any, web3Api: WEBTHREEAPITYPES, abi: any): CALLSENDMETHOD => {
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

// export const useFetchCallSendMethod = (address: string, signer: any, web3Api: WEBTHREEAPITYPES ): CALLSENDMETHOD => {
//   const [callContract, setCallContract] = useState({ call: null });
//   const [sendContract, setSendContract] = useState({ send: null });

//   useEffect(() => {
//     const deploySendFactory = async () => {
//       try {
//         setSendContract({ send: new ethers.Contract(address, factoryAbi, signer) });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     deploySendFactory();
//   }, [address, signer, factoryAbi ])

//   useEffect(() => {
//     const deployCallContractFactory = async () => {
//       try {
//         setCallContract({ call: new ethers.Contract(address, factoryAbi, web3Api.web3) });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     deployCallContractFactory();
//   }, [address, web3Api.web3, factoryAbi])

//   return { callContract, sendContract }
// }