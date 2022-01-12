export const contractFunctions = (()=>{

    const obj = {}

    obj.addFunds = async (web3Api, val)=>{

        const {contract, web3} = web3Api

        const accounts = await web3Api.web3.eth.getAccounts()

        await contract.addFunds({

          from: accounts[0],

          value: web3.utils.toWei(val, "ether")

        })
  
    }


    return obj
})()