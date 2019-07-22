const express = require('express');
const dai = require('@makerdao/dai');
const config = require('../../config');
const keeperService = require('../services/keeperService')(dai, config);
const { validateInputParams } = require('../utils/validators');

const router = express.Router();

router.get('/status', async (req, res) => {
  try {
    const { running, lastCdp } = await keeperService.getStatus();
    res.status(200).json({
      running,
      lastCDP: lastCdp
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      running: false,
      error: 'There was an error. Try calling /start'
    });
  }
  
});

router.post('/start', async (req, res) => {
  const options = validateInputParams(req.body);
  const ok = await keeperService.startKeeper(options);
  res.status(200).json({
    message: 'Bite Keeper has been started',
    ok
  });
});

router.post('/stop', async (req, res) => {
  const ok = await keeperService.stopKeeper();
  res.status(200).json({
    message: 'Bite Keeper stopped',
    ok
  });
});

module.exports = router;
