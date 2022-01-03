import { VFC, useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { abi } from '../artifacts/Owner.json'
import { ethers, providers } from 'ethers'

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const LOTTERY: VFC = () => {

  const [ owner, setOwner ] = useState('');
  const [ players, setPlayers ] = useState(0);
  const [ ether, setEther ] = useState('');
  const [ winner, setWinner ] = useState('');

  const [ web3Api, setWeb3Api ] = useState({
    provider: null,
    web3: null,
  });

  const [ sendContract, setSendContract ] = useState({
    send: null,
  })

  const [ callContract, setCallContract ] = useState({
    call: null,
  })

  useEffect(() => {
    const loadProvider = async () => {
      let provider: any = await detectEthereumProvider();
      let signer;
      let address;

      if(provider){
        provider.request({
          method: "eth_requestAccounts"
        });
        setWeb3Api({
          provider,
          web3: new ethers.providers.Web3Provider(provider),
        })

        address = contractAddress;
        signer = await new providers.Web3Provider(provider).getSigner()

        setSendContract({
          send: new ethers.Contract(address, abi, signer),
        })
      } else {
        console.log('Please Install MetaMask');
      }
    }
    loadProvider();
  }, [])

  useEffect(() => {
    const deployFactory = async() => {
      let address: string
      try {
        address = await contractAddress;
        setCallContract({
          call: new ethers.Contract(address, abi, web3Api.web3),
        })
      } catch (err) {
        console.log(err);
      }
    }
    deployFactory();
  }, [web3Api.web3])

  const getContractPlayers = (event) => {
    event.preventDefault();
    const fetchPlayers = async() => {
      let entryPlayers
      try{
        entryPlayers = await callContract.call.getPlayers();
        console.log(entryPlayers);
        setPlayers(entryPlayers.length);
      } catch (err){
        console.log(err);
      } finally {
        entryPlayers = null;
      }
    }
    fetchPlayers();
  }

  const getContractOwner = (event) => {
    event.preventDefault();
    const showContract = async() => {
      let fetchOwner;
      try{
        fetchOwner = await callContract.call.getOwner();
        setOwner(fetchOwner);
      } catch (err){
        console.log(err);
      } finally {
        fetchOwner = null;
      }
    }
    showContract();
  }

  const addLotteryEther = (event) => {
    event.preventDefault();
    const setEntery = async() => {
      setEther(await event.target.value);
    }
    setEntery();
  }

  const entrylotteryButton = (event) => {
    event.preventDefault();
    const entryLotteryPlayer = async() => {
      try {
        const amount = await ethers.utils.parseEther(ether);
        await sendContract.send.setEntry({
          from: web3Api.provider.selectedAddress,
          value: amount 
        });
      } catch (err) {
        console.log(err);
      } finally {
        setEther('');
      }
    }
    entryLotteryPlayer();
  }

  const pickWinnerButton = (event) => {
    event.preventDefault();
    const addPickWinner = async() => {
      let win;
      try {
        await sendContract.send.pickWinner();
        win = await callContract.call.getWinner();
      } catch (err) {
        console.log(err);
      } finally {
        setWinner(win);
      }
    }
    addPickWinner();
  }

  return (
    <>
      <div>
        <header>
          <h1>Lottery Contract</h1>
        </header>
      </div>
      <div>
        <main>
          <hr />
          <div>
            <h2>Who is a Owner?</h2>
            <div>
              <button onClick={getContractOwner} >Owner</button>
            </div>
            <p>{owner} is owner</p>
          </div>
          <hr />
          <div>
            <h2>How many Players Entry?</h2>
            <div>
              <button onClick={getContractPlayers} >Players</button>
            </div>
            <p>{ players }: players entry</p>
          </div>
          <hr />
          <div>
            <h2>Amount of ether to ether</h2>
            <label>Ether Value:
              <input type="text" value={ether} onChange={addLotteryEther} />
            </label>
            <div>
              <label>Entry The Lottery
                <button onClick={entrylotteryButton}>Enter</button>
              </label>
            </div>
          </div>
          <hr />
          <div>
            <h2>Time to pick a winner</h2>
            <button onClick={pickWinnerButton}>Pick Winner</button>
          </div>
          <div>
            <p>{winner} has won!</p>
          </div>
          <hr />
        </main>
      </div>
    </>
  )
}

export default LOTTERY