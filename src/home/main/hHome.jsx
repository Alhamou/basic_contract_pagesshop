import { Badge, Alert } from 'react-bootstrap';

export const HHome = function(web3Api, accounts, balance, addFunds){

    return(
        <>
            <br /><br />
            <div className="container">
            <h1>Hallo in your Wallet</h1>

            <h3>
                Contract balance is: <Badge bg="secondary">{balance} ETH</Badge>
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
    )
}