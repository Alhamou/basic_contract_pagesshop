
import { useEffect, useState } from "react";
// import {initial} from "../../global/initial/initial";
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContracts } from "../../utils/load-contracts";
import { Badge, Alert } from 'react-bootstrap';
import { contractFunctions } from "../../global/ether/functions";

import "./HomeComponent.css";

function HomeComponent() {

  const [accounts, setAccounts] = useState([])
  const [balance, setBalance] = useState(null)

  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    contract: null
  })

  useEffect(() => {

    (async ()=>{

      let provider = await detectEthereumProvider()
      const contract = await loadContracts("PagesShop", provider)

      // await contract.addFunds({from: "0x8C014CEa741a56f18D4F4F99752C7ad02C0ce1D4", value:"2000000000000000000"})
      // console.log(test.toString())
      if(provider){

        setWeb3Api({web3: new Web3(provider), provider, contract})

      } else{
          console.error("User denied accounts access!")
      }

    })()


  }, [])

  useEffect(()=>{

    const getBalance = async () =>{

      const {contract, web3} = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      const fromWei = web3.utils.fromWei(balance, "ether")
      setBalance(fromWei)
    }
    
    web3Api.contract && getBalance()

  },[web3Api])


  useEffect(()=>{

    (async()=>{

      try {
        const accounts = await web3Api.web3.eth.getAccounts()
        setAccounts(accounts[0])
      } catch {}

    })()

  },[web3Api.web3])

    const addFunds = async ()=>{
      contractFunctions.addFunds(web3Api, "0.01")
    }
    
    return (
      <>
        <br /><br />
        <div className="container">
          <h1>Hallo in your Wallet</h1>

          <h3>
            Your balance is: <Badge bg="secondary">{balance} ETH</Badge>
          </h3>
          <br />
          {
            accounts 
            ?
              <Alert key="cdcdcd" variant="secondary">
                {accounts}
              </Alert>
            : 
              <button onClick={()=> web3Api.provider.request({method: "eth_requestAccounts"})}>
                connect wallet 
              </button>
          }

          <br />
          <button className="btn btn-info" onClick={addFunds}>donaite</button>
        </div>
      </>
    );
  }
  
  export default HomeComponent;