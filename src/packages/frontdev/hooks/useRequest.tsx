import { useState, useEffect } from 'react';
import { REQUESTTYPES } from '..//utils/types/kickstarter.types'
import { ethers } from 'ethers';

interface FETCHREQUESTLIST {
  requestListItems: REQUESTTYPES[]
}

export const useFetchRequestList = (requestCount: number, callContract: any): FETCHREQUESTLIST => {
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