const db = require('../db');
const { getOddsForSport } = require('../integrations/theOddsApi');

function probFromOdd(odd) {
  const n = Number(odd);
  if (!n || n<=0) return 0;
  return 1/n;
}

async function runUnderBot() {
  try {
    const data = await getOddsForSport('soccer_epl');
    if (!Array.isArray(data)) return;
    for (const g of data) {
      const bookmakers = g.bookmakers || [];
      const totals = (bookmakers[0] && bookmakers[0].markets)? bookmakers[0].markets.find(m=>m.key==='totals') : null;
      if (!totals || !totals.outcomes) continue;
      const underObj = totals.outcomes.find(o=>/Under/i.test(o.name) && /2.5/.test(o.name));
      if (!underObj) continue;
      const oddUnder = Number(underObj.price);
      const prob = probFromOdd(oddUnder);
      const ev = prob * oddUnder - 1;
      if (ev > 0.03) {
        const home = g.home_team, away = g.away_team;
        const stmt = db.prepare(`INSERT INTO bets (fixture_id, league, home, away, market, selection, odd, stake, ev, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        stmt.run(g.id||`${home}-${away}-${Date.now()}`, g.sport_title||'soccer', home, away, 'under_2_5', 'under', oddUnder, 10, ev, 'pending');
        stmt.finalize();
      }
    }
  } catch (err) {
    console.error('underBot error', err.message);
  }
}

module.exports = { runUnderBot };
