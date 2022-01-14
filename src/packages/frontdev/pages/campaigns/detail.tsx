import { VFC, useState, useCallback } from 'react';
import styles from '../../assets/components/pages/ContractDetail.module.scss';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';

import { ethers } from 'ethers';
import { campaignAbi } from '../../utils/provider.index';
import { useLoadProvider, useFetchCallSendMethod, useSetUserAddress, useShowContractDetail } from '../../hooks/useContract';

import { KICKSTARTERPROPS } from '../../utils/types/kickstarter.types'
import { HomeLayout } from '../../components/templates/HomeLayout';
import { BaseButton } from '../../components/atoms/BaseButton';
import { BaseInput } from '../../components/atoms/BaseInput';
import { BaseTextCard } from '../../components/atoms/BaseTextCard';

const CONTRACTDETAIL: VFC<KICKSTARTERPROPS> = ({ contract }) => {
  const [ amount, setAmount ] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');
  
  const { signer, web3Api } = useLoadProvider();
  const { callContract, sendContract } = useFetchCallSendMethod(contract, signer, web3Api, campaignAbi);
  const { userAddress } = useSetUserAddress(web3Api);
  const { minimum, balance, request, approversCount, managerAddress } = useShowContractDetail(callContract);
  
  const router = useRouter();

  const editAmountValue = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);

  const addCreateContribute = useCallback(async(event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const setAmount = ethers.utils.parseEther(amount);
      await sendContract.send.contribute({
        from: userAddress,
        value: setAmount
      });
      setResultMessage('Contribute OK')
    } catch(err) {
      setResultMessage(err.message);
    } finally {
      setAmount('');
    }
  }, [sendContract, amount, userAddress])

  const addToRequestPage = useCallback(async (contract: string) => {
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
        <div className={styles.contractDetail_container}>
          <div className={styles.contractDetail_container__guide}>
            <div className={styles.contractDetail_container__guide___title}>
              <h2>
                Campaign Contract Detail
              </h2>
              <div className={styles.contractDetail_container__guide___containts}>
                <ul>
                  <li>
                    <BaseTextCard
                      labelMain={`Contract : ${ contract }`}
                      labelSub={`Manager : ${ managerAddress }`}
                      isMedium={true }
                      isPrimary={ true }
                    />
                  </li>
                  <li>
                    <BaseTextCard
                      labelMain="Balance"
                      labelValue={ balance }
                      isMedium={true}
                      isPrimary={ false}
                    />
                  </li>
                  <li>
                    <BaseTextCard
                      labelMain="Minimum"
                      labelValue={ minimum }
                      isMedium={true}
                      isPrimary={ false}
                    />
                  </li>
                  <li>
                    <BaseTextCard
                      labelMain="Approvers"
                      labelValue={ request }
                      isMedium={ true }
                      isPrimary={ false}
                    />
                  </li>
                  <li>
                    <BaseTextCard
                      labelMain="Requests"
                      labelValue={ approversCount }
                      isMedium={ true }
                      isPrimary={ false}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.contractDetail_container__containts}>
            <div className={styles.contractDetail_container__containts___items}>
              <BaseInput
                guide="Contribute to This Contract"
                label='wei'
                value={ amount }
                placeholder='0'
                onChange={ editAmountValue }
              />
              <BaseButton
                label='Contribute'
                isType='primary'
                onClick={ addCreateContribute }
              />
              <div className={styles.contractDetail_container__containts___items____message}>
                <p>{ resultMessage }</p>
              </div>
              <div className={styles.contractDetail_container__containts___items____topage}>
                <BaseButton
                  label='to Create Request'
                  isType='secondary'
                  onClick={ () => addToRequestPage(contract) }
                />
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default CONTRACTDETAIL;

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const contract = ctx.query.contract;
  return {
    props: {
      contract: contract
    }
  }
}