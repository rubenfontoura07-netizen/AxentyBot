const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../bets.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fixture_id TEXT,
    league TEXT,
    home TEXT,
    away TEXT,
    market TEXT,
    selection TEXT,
    odd REAL,
    stake REAL,
    ev REAL,
    result TEXT,
    profit REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
