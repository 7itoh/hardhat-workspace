import { VFC, useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';

import detectEthereumProvider from '@metamask/detect-provider';
import { campaignAbi } from '../../utils/provider.index';
import { ethers, providers } from 'ethers';

import { HomeLayout } from '../../components/templates/HomeLayout';
import { BaseButton } from '../../components/atoms/BaseButton';
import { BaseInput } from '../../components/atoms/BaseInput';
import { BaseTextCard } from '../../components/atoms/BaseTextCard';
import { KICKSTARTERPROPS } from '../../utils/types/kickstarter.types'
import styles from '../../assets/components/pages/ContractDetail.module.scss';

const CONTRACTDETAIL: VFC<KICKSTARTERPROPS> = ({ contract }) => {
  const [router, setRouter] = useState(useRouter());

  const [ address, setAddress ] = useState<string>(contract);
  const [ signer, setSigner ] = useState(undefined);
  const [ web3Api, setWeb3Api ] = useState({ provider: null, web3: null });

  const [ sendContract, setSendContract ] = useState({ send: null });
  const [ callContract, setCallContract ] = useState({ call: null });

  const [managerAddress, setManagerAddress] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [ request, setRequest ] = useState<[]>([]);
  const [ approversCount, setApproversCount ] = useState<number>(0);
  const [ balance, setBalance ] = useState<string>('');

  const [ minimum, setMinimum ] = useState<string>('');
  const [ amount, setAmount ] = useState<string>('');
  const [ resultMessage, setResultMessage ] = useState<string>('');

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
        setMinimum(ethers.utils.formatEther(summary[0]));
        setBalance(ethers.utils.formatEther(summary[1]));
        setRequest(summary[2]);
        setApproversCount(summary[3]);
        setManagerAddress(summary[4]);
        console.log(summary[4]);
        setUserAddress(await web3Api.provider.selectedAddress);
      } catch(err) {
        console.log(err);
      }
    }
    fetchInitialInfo();
  }, [callContract, web3Api])

  const editAmountValue = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);

  const addCreateContribute = useCallback(async(event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const setAmount = ethers.utils.parseEther(amount);
      await sendContract.send.contribute({
        from: userAddress,
        value: setAmount
      });
      setResultMessage('Create Success! Please Back to Top Page')
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
              <div>
                <p>{ resultMessage }</p>
              </div>
              <div className={styles.contractDetail_container__guide___containts}>
                <ul>
                  <li>
                    <BaseTextCard
                      labelMain={`Contract : ${address}`}
                      labelSub={`Manager : ${managerAddress}`}
                      isMedium={true}
                      isPrimary={ true}
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
                      isMedium={true}
                      isPrimary={ false}
                    />
                  </li>
                  <li>
                    <BaseTextCard
                      labelMain="Requests"
                      labelValue={ approversCount }
                      isMedium={true}
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
                value={amount}
                placeholder='0'
                onChange={ editAmountValue }
              />
              <BaseButton
                label='Contribute'
                isType='primary'
                onClick={ addCreateContribute }
              />
              <div className={styles.contractDetail_container__containts___items____topage}>
                <BaseButton
                  label='to Create Request'
                  isType='secondary'
                  onClick={ () => addToRequestPage(address) }
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