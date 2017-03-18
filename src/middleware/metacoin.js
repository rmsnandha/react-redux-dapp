import Web3 from 'web3'
import { default as contract } from 'truffle-contract'
// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// var Web3 = require('web3')
// var contract = require('truffle-contract')
// var metacoin_artifacts = require('../../build/contracts/MetaCoin.json')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
// Bootstrap the MetaCoin abstraction for Use.
MetaCoin.setProvider(web3.currentProvider);

export const sendCoin = async (transaction) => {

  let meta = await MetaCoin.deployed()
  let result = await meta.sendCoin(transaction.to, transaction.amount, {from: web3.eth.coinbase});

  console.log(`result: ${result}`)
  return result
  // return MetaCoin.deployed().then(function(instance) {
  //   return instance.sendCoin(transaction.to, transaction.amount, {from: web3.eth.coinbase});
  // }).then(function() {
  //   console.log('Transaction successful!');
  // }).catch(function(e) {
  //   console.log(e);
  // });

}

export const getBalance = async (address) => {
  let meta = await MetaCoin.deployed()
  let balance = await meta.getBalance.call(address)

  return balance.toNumber()
}