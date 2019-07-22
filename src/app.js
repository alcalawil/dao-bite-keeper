const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const indexRoute = require('./routes/index');
const biteKeeperRoute = require('./routes/keeper');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/', indexRoute);
app.use('/bite-keeper', biteKeeperRoute);

app.use((req, res, next) => {
  let err = new Error('Route not found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
