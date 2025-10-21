const express = require('express');
const router = express.Router();
const db = require('../db');

// list bets
router.get('/bets', (req, res) => {
  db.all("SELECT * FROM bets ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// create bet (manual)
router.post('/bets', (req, res) => {
  const { fixture_id, league, home, away, market, selection, odd, stake, ev } = req.body;
  const stmt = db.prepare(`INSERT INTO bets (fixture_id, league, home, away, market, selection, odd, stake, ev, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  stmt.run(fixture_id||'', league||'', home||'', away||'', market||'', selection||'', odd||0, stake||0, ev||0, 'pending', function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// mark result
router.post('/bets/:id/result', (req, res) => {
  const id = req.params.id;
  const { result, profit } = req.body;
  const stmt = db.prepare(`UPDATE bets SET result = ?, profit = ? WHERE id = ?`);
  stmt.run(result, profit || 0, id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

module.exports = router;
