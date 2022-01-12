import contract from '@truffle/contract'


export const loadContracts = async (name, provider)=>{

    const res = await fetch(`/contracts/${name}.json`)
    const Artifacts = await res.json()

    const _contract = contract(Artifacts)
    await _contract.setProvider(provider)
    return await _contract.deployed() 

}