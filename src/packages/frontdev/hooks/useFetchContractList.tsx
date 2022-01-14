import { useState, useEffect } from 'react';

type CONTRACTSLISTTYPE = string[]

interface USECONTRACTLIST {
  contractsList: CONTRACTSLISTTYPE
}

export const useContractsList = (callContract: any): USECONTRACTLIST => {
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