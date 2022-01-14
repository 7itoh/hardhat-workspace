import { VFC, useState, useCallback } from 'react';
import styles from '../../assets/components/pages/CreateContractPage.module.scss';
import Link from 'next/link';

import { ethers } from 'ethers';
import { factoryAddress, factoryAbi } from '../../utils/provider.index';
import { useLoadProvider, useFetchCallSendMethod, useSetUserAddress } from '../../hooks/useContract';

import { HomeLayout } from '../../components/templates/HomeLayout';
import { BaseButton } from '../../components/atoms/BaseButton';
import { BaseInput } from '../../components/atoms/BaseInput';

const CREATECONTRACT : VFC = () => {
  const [amount, setAmount] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');

  const { signer, web3Api } = useLoadProvider();
  const { sendContract } = useFetchCallSendMethod(factoryAddress, signer, web3Api, factoryAbi);
  const { userAddress } = useSetUserAddress(web3Api);

  const editAmountValue = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);

  const addCreateContract = useCallback(async(event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const setAmount = ethers.utils.parseEther(amount);
      await sendContract.send.createCampaign(setAmount, {
        from: userAddress
      });
      setResultMessage('Create Success! Please Back to Top Page')
    } catch(err) {
      setResultMessage(err.message);
    } finally {
      setAmount('');
    }
  },[sendContract, amount, userAddress])

  return (
    <>
      <HomeLayout>
        <div className={styles.createContract_container}>
          <div className={styles.createContract_container__guide}>
            <div className={styles.createContract_container__guide___title}>
              <h2>Create a New Contract</h2>
              <Link href="/">
                <a>
                  { resultMessage }
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.createContract_container__containts}>
            <div className={styles.createContract_container__containts___items}>
              <BaseInput
                guide="Enter Value for Minimum Contribution"
                label='wei'
                value={amount}
                placeholder='0'
                onChange={ editAmountValue }
              />
              <BaseButton
                label='Create'
                onClick={ addCreateContract }
                isType='primary'
              />
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default CREATECONTRACT;