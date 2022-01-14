import { useState, useEffect } from 'react';

interface WEBTHREEAPITYPES {
  provider: any | null,
  web3: any | null
}

type USERADDRESS = string;

interface USERADDRESSTYPES {
  userAddress: USERADDRESS;
}

export const useSetUserAddress = (web3Api: WEBTHREEAPITYPES): USERADDRESSTYPES => {
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