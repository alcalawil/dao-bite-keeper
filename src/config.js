require("dotenv").config();
const env = process.env;

if (!env.PRIVATE_KEY) {
  throw new Error('Private key required');
}

module.exports = {
  networkType: env.NETWORK_TYPE || 'http',
  privateKey: env.PRIVATE_KEY,
  url: env.URL,
  logLevel: env.LOG_LEVEL,
  serverPort: env.SERVER_PORT
};
