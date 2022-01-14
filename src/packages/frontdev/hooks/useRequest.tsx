import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CALLCONTRACTMETHOD, REQUESTTYPES, FETCHREQUESTLIST, REQUESTCOUNT } from './types/hooks.types'

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