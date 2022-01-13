
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
          <h1>Hallo in your Wallet</h1>

          <h3>
            Contract balance is: <Badge bg="secondary">{balance} ETH</Badge>
          </h3>
          <br />
          {
            account
            ?
              
              <Alert key="xx" variant="secondary">
                {account}
              </Alert>
            : 
              !web3Api.provider ?
                <>
                  <p>Wallet is not detected <a target="_blank" rel="noreferrer" href="https://docs.metamask.io">Insatll Metamask</a></p>
                </>
            :
              <button onClick={()=> web3Api.provider.request({method: "eth_requestAccounts"})}>
                connect wallet 
              </button>
          }

          <br />
          <button disabled={!account} className="btn btn-info" onClick={addFunds}>donaite</button>
          <button disabled={!account} className="btn btn-success m-2" onClick={withdraw}>withdraw</button>
        </div>
      </>
    );
  }
  
  export default HomeComponent;