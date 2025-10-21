const db = require('../db');
const { getOddsForSport } = require('../integrations/theOddsApi');
const { simpleMatchModel } = require('../utils/evCalculator');

async function runMatchOddsBot() {
  try {
    const data = await getOddsForSport('soccer_epl');
    if (!Array.isArray(data)) return;
    for (const g of data) {
      const home = g.home_team, away = g.away_team;
      const bookmakers = g.bookmakers || [];
      const market = (bookmakers[0] && bookmakers[0].markets) ? bookmakers[0].markets.find(m=>m.key==='h2h') : null;
      if (!market || !market.outcomes) continue;
      const homeOddObj = market.outcomes.find(o=>o.name===home);
      const awayOddObj = market.outcomes.find(o=>o.name===away);
      const drawOddObj = market.outcomes.find(o=>/draw/i.test(o.name) ? true : false);
      const homeOdd = homeOddObj ? Number(homeOddObj.price) : null;
      const awayOdd = awayOddObj ? Number(awayOddObj.price) : null;
      const drawOdd = drawOddObj ? Number((drawOddObj.price||drawOddObj.price)) : null;

      if (!homeOdd || !awayOdd) continue;
      const probs = simpleMatchModel(homeOdd, awayOdd, drawOdd);
      const evHome = probs.probHome * homeOdd - 1;
      if (evHome > 0.03) {
        const stmt = db.prepare(`INSERT INTO bets (fixture_id, league, home, away, market, selection, odd, stake, ev, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        stmt.run(g.id||`${home}-${away}-${Date.now()}`, g.sport_title||'soccer', home, away, 'match_odds', 'home', homeOdd, 10, evHome, 'pending');
        stmt.finalize();
      }
    }
  } catch (err) {
    console.error('matchOddsBot error', err.message);
  }
}

module.exports = { runMatchOddsBot };
