// reading token URI

const Web3 = require('web3')
const rpcURL = 'https://rinkeby.infura.io/v3/39f4588fa9b14c9ab5888675d3d58d43'

const web3 = new Web3(rpcURL)

const contractAddress = "0x74a99AeF15B7Dfa92aB367dc60eD1f62125Afa87"

const contractABI = require("./contractAbi.js") 

const contractRead = async() => {
    try{
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        let readingTrax = await contract.methods.tokenURI(3).call();
        console.log('Call_Out_Put', readingTrax)
    }
    catch (error) {
        console.log('error', error)
    }
}

contractRead()