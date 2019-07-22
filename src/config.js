require("dotenv").config();
const env = process.env;

module.exports = {
  networkType: env.NETWORK_TYPE || 'http',
  privateKey: env.PRIVATE_KEY,
  url: env.URL,
  logLevel: env.LOG_LEVEL,
  serverPort: env.SERVER_PORT
};
