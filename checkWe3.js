// only to check if web is configured correctly

const Web3 = require('web3')
const rpcURL = 'https://rinkeby.infura.io/v3/39f4588fa9b14c9ab5888675d3d58d43'

const web3 = new Web3(rpcURL)

const address = "0x4fa3D5b91fCF8bCDe7933FBb5F0295cC5812f74c"

web3.eth.getBalance(address, (err,wei)=> {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("balance = ", balance)
})