const winston = require('winston');
const config = require('../../config');

const createRange = (first, last) => {
  return Array.from(new Array(last - first + 1), (x, i) => i + first);
};

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.timestamp(),
  transports: [
      new winston.transports.Console({
          format: winston.format.combine(
              winston.format.colorize(),
              winston.format.align(),
              winston.format.printf(
                  info => `${info.timestamp} [${info.level}]: ${info.message}`
              )
          )
      })
  ]
});


module.exports = { createRange, logger };
