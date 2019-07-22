const http = require('http');
const { logger } = require('./utils/util');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server listening at port: ${PORT}`);
});
