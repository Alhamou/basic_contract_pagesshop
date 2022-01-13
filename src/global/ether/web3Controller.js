export const web3Controller = (()=>{

    const obj = {}

    obj.addFunds = async (web3Api, account)=>{

        const {contract, web3} = web3Api


        await contract.addFunds({

          from: account,

          value: web3.utils.toWei("0.1", "ether")

        })
  
    }
    obj.withdraw = async (web3Api, account)=>{

        const {contract, web3} = web3Api


        await contract.withdraw( web3.utils.toWei("0.1", "ether") ,{

          from: account

        })
  
    }

    obj.getAccounts = async function(web3Api){

      let accounts = [""]
      
      try{
        accounts = await web3Api.web3.eth.getAccounts()
      }catch{}

      return accounts
    }

    obj.getBalance = async function(web3Api){

      const {contract, web3} = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      const fromWei = web3.utils.fromWei(balance, "ether")

      return fromWei
    }

    

    return obj
})()