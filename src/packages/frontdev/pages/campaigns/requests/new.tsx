import { VFC, useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from '../../../assets/components/pages/CreateRequestPage.module.scss';

import { campaignAbi } from '../../../utils/provider.index';
import { ethers } from 'ethers';

import { KICKSTARTERPROPS } from '../../../utils/types/kickstarter.types'
import { HomeLayout } from '../../../components/templates/HomeLayout';
import { BaseButton } from '../../../components/atoms/BaseButton';
import { BaseInput } from '../../../components/atoms/BaseInput';

import { useLoadProvider } from '../../../hooks/useProviderLoad';
import { useFetchCallSendMethod } from '../../../hooks/useFetchCallSendMethod';
import { useSetUserAddress } from '../../../hooks/useSetUserAddress';

const CREATEREQUEST: VFC<KICKSTARTERPROPS> = ({ contract }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  const [resultMessage, setResultMessage] = useState<string>('');

  const { signer, web3Api } = useLoadProvider();
  const { sendContract } = useFetchCallSendMethod(contract, signer, web3Api, campaignAbi);
  const { userAddress } = useSetUserAddress(web3Api);
  const router = useRouter();

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
      setResultMessage('Create Product Success')
    } catch(err) {
      setResultMessage(err.message);
    } finally {
      setAmount('');
      setRecipient('');
      setDescription('');
    }
  }, [sendContract, web3Api, description, amount, recipient, userAddress])
  
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
                  onClick={ (event: React.MouseEvent) => addBackToRequestsPage(contract) }
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