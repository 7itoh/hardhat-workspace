import { VFC } from "react";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/router";

import detectEthereumProvider from '@metamask/detect-provider';
import { factoryAddress, factoryAbi } from '../utils/provider.index';
import { ethers, providers } from 'ethers';

import { HomeLayout } from '../components/templates/HomeLayout';
import { BaseCard } from '../components/atoms/BaseCard';
import { BaseButton } from '../components/atoms/BaseButton';

import styles from '../assets/components/pages/HomePage.module.scss';

const HOME: VFC = () => {
  const [router, setRouter] = useState(useRouter());

  const [address, setAddress] = useState<string>(factoryAddress);
  const [signer, setSigner] = useState(undefined);
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });

  const [sendContract, setSendContract] = useState({ send: null });
  const [callContract, setCallContract] = useState({ call: null });

  const [contractsList, setContractList] = useState<string[]>(['']);

  useEffect(() => {
    const loadProvider = async () => {
      let provider: any;
      try {
        provider = await detectEthereumProvider();
        if (provider) {
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
      } catch (err) {
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
        setContractList(await callContract.call.getDeployedCampaigns());
      } catch (err) {
        console.log(err);
      }
    }
    fetchInitialInfo();
  }, [callContract])

  const addToDetailPage = useCallback(async (contract: string): Promise<void> => {
    try {
      router.push({
        pathname: `/campaigns/detail`,
        query: {
          contract: contract
        }
      })
    } catch (err) {
      console.log(err);
    }
  }, [router])

  const addToCreatePage = useCallback(async(event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    try {
      router.push('/campaigns/new')
    } catch (err) {
      console.log(err);
    }
  },[router])

  return (
    <>
      <HomeLayout>
        <div className={styles.homePage_container}>
          <div className={styles.homePage_container__guide}>
            <div className={styles.homePage_container__guide___title}>
              <h3>Kickstarter Contract</h3>
            </div>
          </div>
          {/* <button onClick={ test }>on</button> */}
          <div className={styles.homePage_container__containts}>
            <div className={styles.homePage_container__containts___guide}>
              <div className={styles.homePage_container__containts___guide___title}>
                <h3>Campaign Contract List</h3>
              </div>
              <div className={styles.homePage_container__containts___guide___event}>
                <BaseButton onClick={ addToCreatePage } label="Go to Create Campaign"/>
              </div>
            </div>
            <div className={styles.homePage_container__containts___items}>
              <ul>
                {contractsList.map((contract, index) => (
                  <li key={ index }>
                    <BaseCard
                      index={ index }
                      description={ contract }
                      onClick={ () => addToDetailPage(contract) }
                      eventGuide="Let's go to the Campaigns detail Click here!"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default HOME;