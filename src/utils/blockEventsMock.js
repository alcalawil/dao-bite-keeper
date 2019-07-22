const EventEmitter = require("events").EventEmitter;

const blockEmitter = new EventEmitter();
var blockInterval;

const subscribe = callback => {
  blockEmitter.on('block', callback);
  
  blockInterval = setInterval(() => {
    blockEmitter.emit('block', 'New mock block');
  }, 15000);
};

const unsubscribe = () => {
  blockEmitter.removeAllListeners();
  clearInterval(blockInterval);
};

module.exports = { subscribe, unsubscribe };