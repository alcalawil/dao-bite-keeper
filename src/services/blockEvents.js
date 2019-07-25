// TODO: Inject web3 dependency to be testable
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://kovan.infura.io/ws'));

var subscription;

const subscribe = callback => {
  subscription = web3.eth.subscribe('newBlockHeaders', callback);
};

const unsubscribe = callback => {
  subscription.unsubscribe(callback);
};

module.exports = { subscribe, unsubscribe };
