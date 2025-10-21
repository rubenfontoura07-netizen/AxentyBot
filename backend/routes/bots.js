const express = require('express');
const router = express.Router();
const { runMatchOddsBot } = require('../bots/matchOddsBot');
const { runOverBot } = require('../bots/overGoalsBot');
const { runUnderBot } = require('../bots/underGoalsBot');

router.get('/runBots', async (req, res) => {
  try {
    await runMatchOddsBot();
    await runOverBot();
    await runUnderBot();
    res.json({ status: 'bots executed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
