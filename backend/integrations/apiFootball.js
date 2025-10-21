const fetch = require('node-fetch');
const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE = 'https://v3.football.api-sports.io';

async function getUpcomingFixturesByLeague(leagueId, season = new Date().getFullYear()) {
  const res = await fetch(`${BASE}/fixtures?league=${leagueId}&season=${season}`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  return res.json();
}

module.exports = { getUpcomingFixturesByLeague };
