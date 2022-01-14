import { useState, useEffect } from 'react';
import { WEB3API, USERADDRESS, USERADDRESSTYPES} from './types/hooks.types';

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