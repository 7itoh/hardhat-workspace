import { VFC, useState, useCallback } from 'react';
import styles from '../../../assets/components/pages/RequestList.module.scss';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';

import { campaignAbi } from '../../../utils/provider.index';

import { KICKSTARTERPROPS } from '../../../utils/types/kickstarter.types'
import { HomeLayout } from '../../../components/templates/HomeLayout';
import { BaseButton } from '../../../components/atoms/BaseButton';

import { useLoadProvider } from '../../../hooks/useProviderLoad';
import { useFetchCallSendMethod } from '../../../hooks/useFetchCallSendMethod';
import { useSetUserAddress } from '../../../hooks/useSetUserAddress';
import { useFetchInfoCreateContract } from '../../../hooks/useFetchInfoCreateContract';
import { useFetchRequestList  } from '../../../hooks/useRequest';

const REQUESTLIST: VFC<KICKSTARTERPROPS> = ({ contract }) => {
  const [resultMessage, setResultMessage] = useState<string>('');

  const { signer, web3Api } = useLoadProvider();
  const { callContract, sendContract } = useFetchCallSendMethod(contract, signer, web3Api, campaignAbi);
  const { userAddress } = useSetUserAddress(web3Api);
  const { approversCount, requestCount } = useFetchInfoCreateContract(callContract);
  const { requestListItems } = useFetchRequestList(requestCount, callContract);
  const router = useRouter();

  const addApproverRequest = useCallback(async (index: number) => {
    try {
      await sendContract.send.approverRequest(index, {
        from: userAddress
      });
      setResultMessage('Approve OK')
    } catch(err) {
      setResultMessage(err.message);
    }
  }, [sendContract, web3Api, userAddress])

  const addFinalizeRequest = useCallback(async (index: number) => {
    try {
      await sendContract.send.finalizeRequest(index, {
        from: userAddress
      });
      setResultMessage('Request OK')
    } catch(err) {
      setResultMessage(err.message);
    } 
  }, [sendContract, web3Api, userAddress])

  const addToRequestsPage = useCallback(async (contract: string) => {
    try {
      router.push({
        pathname: `/campaigns/requests/new`,
        query: { 
          contract: contract
        }
      })
    } catch (err) {
      console.log(err);
    }
  }, [router])
  
  return (
    <>
      <HomeLayout>
        <div className={styles.requestList_container}>
          <div className={styles.requestList_container__containts}>
            <div className={styles.requestList_container__containts___guide}>
              <div className={styles.requestList_container__containts___guide____title}>
                <h2>
                  Request List
                </h2>
              </div>
              <div className={styles.requestList_container__containts___guide____event}>
                <BaseButton
                  label='Go to Create Request'
                  isType='secondary'
                  onClick={(event: React.MouseEvent) => addToRequestsPage(contract)}
                />
              </div>
            </div>
            <div className={styles.requestList_container__containts___items}>
              <table className={styles.requestList_container__containts___items____table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Recipient</th>
                    <th>Approvers Count</th>
                    <th>Approves</th>
                    <th>Finalize</th>
                  </tr>
                </thead>
                <tbody>
                  {requestListItems.map((request, index) => (
                    <tr key={ index }>
                      <td>{ request.index }</td>
                      <td>{ request.description }</td>
                      <td>{ request.value }</td>
                      <td>{ request.recipient }</td>
                      <td>{ `${request.approversCount}/${ approversCount }` }</td>
                      <td>
                        <BaseButton
                          label='Approve'
                          onClick={(event: React.MouseEvent) => { event.preventDefault(); addApproverRequest(index) }}
                          isType='secondary'
                        />
                      </td>
                      <td>
                        <BaseButton
                          label='Finalize'
                          onClick={(event: React.MouseEvent) => { event.preventDefault(); addFinalizeRequest(index) }}
                          isType='primary'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.requestList_container__containts___items____message}>
                  <p>{ resultMessage }</p>
              </div>
              <div className={styles.requestList_container__containts___items____info}>
                <p>{ `Found ${ requestCount } Request` }</p>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default REQUESTLIST;

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const contract = ctx.query.contract;
  return {
    props: {
      contract: contract
    }
  }
}