const http = require('http');
const { logger } = require('./utils/util');
const config = require('./config');
const app = require('./app');

const PORT = config.serverPort || 5000;

logger.info('Environment variables: ');
logger.info(JSON.stringify(config));

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server listening at port: ${PORT}`);
});
