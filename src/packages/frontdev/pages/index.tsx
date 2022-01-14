import { VFC } from "react";
import styles from '../assets/components/pages/HomePage.module.scss';

import { useRouter } from "next/router";
import { useCallback } from 'react';

import { factoryAddress, factoryAbi } from '../utils/provider.index';
import { useLoadProvider, useFetchCallSendMethod, useFetchContractsList } from '../hooks/useContract';

import { HomeLayout } from '../components/templates/HomeLayout';
import { BaseCard } from '../components/atoms/BaseCard';
import { BaseButton } from '../components/atoms/BaseButton';

const HOME: VFC = () => {
  const { signer, web3Api } = useLoadProvider();
  const { callContract } = useFetchCallSendMethod(factoryAddress, signer, web3Api, factoryAbi);
  const { contractsList } = useFetchContractsList(callContract);

  const router = useRouter();

  const addToDetailPage = useCallback(async(contract: string): Promise<void> => {
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