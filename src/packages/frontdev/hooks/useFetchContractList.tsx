import { useState, useEffect } from 'react';
import { CONTRACTSLISTTYPE, USECONTRACTLIST, CALLCONTRACTMETHOD } from './types/hooks.types'

export const useContractsList = (callContract: CALLCONTRACTMETHOD): USECONTRACTLIST => {
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