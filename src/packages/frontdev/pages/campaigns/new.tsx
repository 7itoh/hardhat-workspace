import { VFC, useState, useEffect, useCallback } from 'react';
import styles from '../../assets/components/pages/CreateContractPage.module.scss';
// import { useRouter } from "next/router";
import Link from 'next/link';

import detectEthereumProvider from '@metamask/detect-provider';
import { factoryAddress, factoryAbi } from '../../utils/provider.index';
import { ethers, providers } from 'ethers';

import { HomeLayout } from '../../components/templates/HomeLayout';
import { BaseButton } from '../../components/atoms/BaseButton';
import { BaseInput } from '../../components/atoms/BaseInput';

const CREATECONTRACT : VFC = () => {
  const [address, setAddress] = useState<string>(factoryAddress);
  const [signer, setSigner] = useState(undefined);
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });

  const [sendContract, setSendContract] = useState({ send: null });
  const [callContract, setCallContract] = useState({ call: null });

  const [managerAddress, setManagerAddress] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');

  useEffect(() => {
    const loadProvider = async () => {
      let provider: any;
      try {
        provider = await detectEthereumProvider();
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
    const deployFactory = async () => {
      try {
        setSendContract({ send: new ethers.Contract(address, factoryAbi, signer) });
        setCallContract({ call: new ethers.Contract(address, factoryAbi, web3Api.web3) });
      } catch (err) {
        console.log(err);
      }
    }
    deployFactory();
  }, [address, signer, web3Api.web3])

  useEffect(() => {
    const fetchInitialInfo = async () => {
      try {
        const summary = await callContract.call.getSummary();
        setManagerAddress(summary[4]);
        setUserAddress(await web3Api.provider.selectedAddress);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInitialInfo();
  }, [callContract, web3Api])

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