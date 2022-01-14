import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, providers } from 'ethers';

export const useLoadProvider = () => {
  const [signer, setSigner] = useState(undefined);
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });

  useEffect(() => {
    const loadProvider = async () => {
      let provider: any;
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