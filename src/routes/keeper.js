const express = require('express');
const exchangeService = require('../services/keeperService');
const { validateInputParams } = require('../utils/validators');

const router = express.Router();

router.get('/status', async (req, res) => {
  const status = await exchangeService.getStatus();
  res.status(200).json({
    message: 'Bite Keeper status',
    status
  });
});

router.post('/start', async (req, res) => {
  const options = validateInputParams(req.body);
  const ok = await exchangeService.startKeeper(options);
  res.status(200).json({
    message: 'Bite Keeper has been started',
    ok
  });
});

router.post('/stop', async (req, res) => {
  const ok = await exchangeService.stopKeeper();
  res.status(200).json({
    message: 'Bite Keeper stopped',
    ok
  });
});

module.exports = router;
