import { VFC, useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from '../../../assets/components/pages/CreateRequestPage.module.scss';

import detectEthereumProvider from '@metamask/detect-provider';
import { campaignAbi } from '../../../utils/provider.index';
import { ethers, providers } from 'ethers';

import { KICKSTARTERPROPS } from '../../../utils/types/kickstarter.types'
import { HomeLayout } from '../../../components/templates/HomeLayout';
import { BaseButton } from '../../../components/atoms/BaseButton';
import { BaseInput } from '../../../components/atoms/BaseInput';

const CREATEREQUEST: VFC<KICKSTARTERPROPS> = ({ contract }) => {
  const [router, setRouter] = useState(useRouter());
  const [address, setAddress] = useState<string>(contract);
  const [signer, setSigner] = useState(undefined);
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });

  const [sendContract, setSendContract] = useState({ send: null });
  const [callContract, setCallContract] = useState({ call: null });

  const [managerAddress, setManagerAddress] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');

  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

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
        setManagerAddress(summary[4]);
        setUserAddress(await web3Api.provider.selectedAddress);
      } catch(err) {
        console.log(err);
      }
    }
    fetchInitialInfo();
  }, [callContract, web3Api])

  const editDescriptionValue = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);
  const editAmountValue = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);
  const editRecipientValue = (event: React.ChangeEvent<HTMLInputElement>) => setRecipient(event.target.value);

  const addCreateRequest = useCallback(async(event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const setAmount = ethers.utils.parseEther(amount);
      await sendContract.send.createRequest(description, setAmount, recipient, {
        from: userAddress
      });
      console.log(await callContract.call.getSummary());
      setResultMessage('Create Success! Please Back to Top Page')
    } catch(err) {
      setResultMessage(err.message);
    } finally {
      setAmount('');
      setRecipient('');
      setDescription('');
    }
  }, [sendContract, web3Api, description, amount, recipient, userAddress])
  
  const test = useCallback(async (event: React.MouseEvent): Promise<void> => {
    try {
      console.log(await callContract.call.getRequestsCount());
      console.log(await callContract.call.requests(0));
      console.log(await callContract.call.requests(1));
      console.log(await callContract.call.requests(2));
    } catch (err) {
      setResultMessage(err.message);
    }
  }, [callContract])
  
  const addBackToRequestsPage = useCallback(async (contract: string) => {
    try {
      router.push({
        pathname: `/campaigns/requests`,
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
        <div className={styles.createRequest_container}>
          <div className={styles.createRequest_container__guide}>
            <div className={styles.createRequest_container__guide___title}>
              <h2>
                Create Request
              </h2>
              <div>
                <p>{ resultMessage }</p>
              </div>
            </div>
          </div>
          <div className={styles.createRequest_container__containts}>
            <div className={styles.createRequest_container__containts___items}>
              <BaseInput
                guide="Description"
                label=''
                value={ description }
                placeholder='Buy Batteries'
                onChange={ editDescriptionValue }
              />
              <BaseInput
                guide="Value"
                label='wei'
                value={ amount }
                placeholder='0'
                onChange={ editAmountValue }
              />
              <BaseInput
                guide="Recipient Address"
                label=''
                value={ recipient }
                placeholder='0x0123456789abcdef0123456789abcdef01234567'
                onChange={ editRecipientValue }
              />
              <BaseButton
                label='Request'
                onClick={ addCreateRequest }
                isType='primary'
              />
              <div className={styles.createRequest_container__containts___items____toback}>
                <BaseButton
                  label='Go Back to Request Page'
                  onClick={ (event: React.MouseEvent) => addBackToRequestsPage(address) }
                  isType='secondary'
                />
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default CREATEREQUEST;

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const contract = ctx.query.contract;
  return {
    props: {
      contract: contract
    }
  }
}