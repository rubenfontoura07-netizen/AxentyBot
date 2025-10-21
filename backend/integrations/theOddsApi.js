const fetch = require('node-fetch');
const API_KEY = process.env.THEODDS_KEY;
const BASE = 'https://api.the-odds-api.com/v4';

async function getOddsForSport(sport = 'soccer_epl') {
  const url = `${BASE}/sports/${sport}/odds/?regions=eu&markets=h2h,totals&oddsFormat=decimal&apiKey=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

module.exports = { getOddsForSport };
