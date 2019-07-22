const http = require('http');
const { logger } = require('./utils/util');
const config = require('./config');
const app = require('./app');

const PORT = config.serverPort || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server listening at port: ${PORT}`);
});
