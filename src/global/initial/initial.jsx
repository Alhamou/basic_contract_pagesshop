
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

export const initial = (() =>{

    const obj = {}

    obj.apiWeb3 = async function () {


        // with metamask we have an access to window.ethereum & to window.web3
        // metamask injects a global API into website
        // this API allows websites to request users, accounts, read data to blockchain,
        // sign messages and transactions
        // console.log(window.web3)
        // console.log(window.ethereum)

        // let provider;

        // if (window.ethereum) {
        //     provider = window.ethereum;

        //     try {
        //         await provider.request({method: "eth_requestAccounts"})
                
        //     } catch {
        //         console.error("User denied accounts access!")
        //     }

        // }
        // else if (window.web3) {
        //     provider = window.web3.currentProvider
            

        // }
        // else if (!process.env.production) {
        //     provider = new Web3.providers.HttpProvider("http://localhost:7545")
            
        // }

        // return provider
    }

    return obj;
})()

