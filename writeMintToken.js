//writing in contract with web3

const Web3 = require('web3')
const rpcURL = 'https://rinkeby.infura.io/v3/39f4588fa9b14c9ab5888675d3d58d43'
const Tx = require('ethereumjs-tx').Transaction;
require("dotenv").config();

const web3 = new Web3(rpcURL)

const address1 = "0x4fa3D5b91fCF8bCDe7933FBb5F0295cC5812f74c"
//const address2 = "0x679083d5cB256f43826f4b1Dc7dE84Fc8C575328"
const contractAddress = "0x74a99AeF15B7Dfa92aB367dc60eD1f62125Afa87"
let contractABI = require("./contractAbi.js");
const privateKey = process.env["PVTKEY"];
const bufferPrivateKey = Buffer.from(privateKey, "hex");


const setPause = async() => {
    try{
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        let txCount = await web3.eth.getTransactionCount(address1);

        const txObject =  {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            data: contract.methods.mint(1).encodeABI(),
            gasLimit: web3.utils.toHex(210000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
            }
    
        const tx =  new Tx(txObject, {'chain':'rinkeby'});
        tx.sign(bufferPrivateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        const sigTrans = await web3.eth.sendSignedTransaction(raw, (err, trxHash) => {
            if(!err) {
                console.log("Transaction Hash is", trxHash);
            }

        })
}
catch(e){
    console.log("error", e);
}

}

setPause();