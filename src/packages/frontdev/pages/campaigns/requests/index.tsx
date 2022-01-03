import { VFC, useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import styles from '../../../assets/components/pages/RequestList.module.scss';

import detectEthereumProvider from '@metamask/detect-provider';
import { campaignAbi } from '../../../utils/provider.index';
import { ethers, providers } from 'ethers';

import { KICKSTARTERPROPS, REQUESTTYPES } from '../../../utils/types/kickstarter.types'
import { HomeLayout } from '../../../components/templates/HomeLayout';
import { BaseButton } from '../../../components/atoms/BaseButton';

const REQUESTLIST: VFC<KICKSTARTERPROPS> = ({ contract }) => {
  const [address, setAddress] = useState<string>(contract);
  const [signer, setSigner] = useState(undefined);
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });

  const [router, setRouter] = useState(useRouter());
  const [sendContract, setSendContract] = useState({ send: null });
  const [callContract, setCallContract] = useState({ call: null });

  const [managerAddress, setManagerAddress] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [isApprover, setIsApprover] = useState<boolean>(false);

  const [requestListItems, setRequestListItems] = useState<REQUESTTYPES[]>([]);
  const [approversCount, setApproversCount ] = useState<string>('');
  const [requestCount, setRequestCount] = useState<number>(null); 

  const [resultMessage, setResultMessage] = useState<string>('');

  useEffect(() => {
    const loadProvider = async () => {
      let provider: any = await detectEthereumProvider();
      try {
        if(provider){
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
      } catch(err) {
        console.log(err);
      }
    }
    loadProvider();
  }, [])

  useEffect(() => {
    const deployFactory = async() => {
      try {
        setSendContract({ send: new ethers.Contract(address, campaignAbi, signer) });
        setCallContract({ call: new ethers.Contract(address, campaignAbi, web3Api.web3) });
      } catch (err) {
        console.log(err);
      }
    }
    deployFactory();
  }, [address, signer, web3Api.web3])

  useEffect(() => {
    const fetchInitialInfo = async() => {
      try {
        const summary = await callContract.call.getSummary();
        setApproversCount(summary[3]);
        setManagerAddress(summary[4]);
        setUserAddress(await web3Api.provider.selectedAddress);
        setIsApprover(await callContract.call.approvers(userAddress));
        setRequestCount(await callContract.call.getRequestsCount());
      } catch(err) {
        console.log(err);
      }
    }
    fetchInitialInfo();
  }, [callContract, web3Api, userAddress])

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
  }, [requestCount, approversCount])

  const addApproverRequest = useCallback(async (index: number) => {
    try {
      await sendContract.send.approverRequest(index, {
        from: userAddress
      });
      setResultMessage('Create Success! Please Back to Top Page')
    } catch(err) {
      setResultMessage(err.message);
    }
  }, [sendContract, web3Api, userAddress])

  const addFinalizeRequest = useCallback(async (index: number) => {
    try {
      await sendContract.send.finalizeRequest(index, {
        from: userAddress
      });
      setResultMessage('Create Success! Please Back to Top Page')
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
                <div>
                  <p>{ resultMessage }</p>
                </div>
              </div>
              <div className={styles.requestList_container__containts___guide____event}>
                <BaseButton
                  label='Go to Create Request'
                  isType='secondary'
                  onClick={(event: React.MouseEvent) => addToRequestsPage(address)}
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
                      <td>{ `${request.approversCount}/${approversCount}` }</td>
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
              <div className={styles.requestList_container__containts___items____info}>
                <p>{ `Found ${requestCount} Request` }</p>
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