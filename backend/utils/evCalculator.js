function impliedProb(odd) {
  const n = Number(odd);
  if (!n || n <= 0) return 0;
  return 1 / n;
}

function normalizeProbs(probs) {
  const s = probs.reduce((a,b)=>a+b,0);
  return probs.map(p => p / s);
}

function simpleMatchModel(homeOdd, awayOdd, drawOdd) {
  const impHome = impliedProb(homeOdd);
  const impAway = impliedProb(awayOdd);
  const impDraw = impliedProb(drawOdd || 0);
  const [h,a,d] = normalizeProbs([impHome, impAway, impDraw]);
  return { probHome: h, probAway: a, probDraw: d };
}

module.exports = { simpleMatchModel, impliedProb };
