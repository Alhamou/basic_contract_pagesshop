
import { useEffect, useState } from "react";
// import {initial} from "../../global/initial/initial";
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContracts } from "../../utils/load-contracts";
import { Badge, Alert } from 'react-bootstrap';
import { web3Controller } from "../../global/ether/web3Controller";

import "./HomeComponent.css";

function HomeComponent() {

  const [account, setAccount] = useState([])
  const [balance, setBalance] = useState(null)
  const [reload, setReload] = useState(false)
  const [web3Api, setWeb3Api] = useState({web3: null,provider: null,contract: null})


  const reloadEffect = () => setReload(!reload)

  const addEventListner = provider => {
    provider.on("accountsChanged", _ => window.location.reload())
    provider.on("chainChanged", _ => window.location.reload())
  }

  useEffect(() => {

    (async ()=>{
      let provider = await detectEthereumProvider()
      if(provider){
        const contract = await loadContracts("PagesShop", provider)
        addEventListner(provider)
        setWeb3Api({web3: new Web3(provider), provider, contract})
      } else{
          console.error("User denied accounts access!")
      }
    })()
  }, [])


  useEffect(()=>{

    web3Api.contract && (async () =>{
      const fromWei = await web3Controller.getBalance(web3Api)
      setBalance(fromWei)
    })()

  },[web3Api, reload])


  useEffect(()=>{
    (async()=>{

      const accounts = await web3Controller.getAccounts(web3Api)
      setAccount(accounts[0])

    })()
  },[web3Api, reload])

  const addFunds = async ()=>{
    await web3Controller.addFunds(web3Api, account)
    reloadEffect()
  }

  const withdraw = async ()=>{
    await web3Controller.withdraw(web3Api, account)
    reloadEffect()
  }
    
  
    return (
      <>
        <br /><br />
        <div className="container">
          <h1>Hallo to PagesShop Contract :)</h1>

          <h3>
          PagesShop contract balance is: <Badge bg="secondary">{balance} ETH</Badge>
          </h3>
          <br />
          {
            account
            ?
              
              <Alert key="xx" variant="secondary">
                <i>Your Account:</i> <b>{account}</b>
              </Alert>
            : 
              !web3Api.provider ?
                <>
                  <p>Wallet is not detected <a target="_blank" rel="noreferrer" href="https://docs.metamask.io">Insatll Metamask</a></p>
                </>
            :
            <button className="btn btn-s btn-light" onClick={()=> web3Api.provider.request({method: "eth_requestAccounts"})}>
              connect wallet 
            </button> 
          }

          <br />

          {
            !web3Api.contract && <p className="text-danger">change your network to ganach</p>
          }

          <button disabled={!web3Api.contract || !account} className="btn btn-s btn-success" onClick={addFunds}>Donate 0.1 ETH</button>
          <button disabled={!web3Api.contract || !account} className="btn btn-s btn-info m-2" onClick={withdraw}>Withdraw 0.1 ETH</button>
        </div>
      </>
    );
  }
  
  export default HomeComponent;