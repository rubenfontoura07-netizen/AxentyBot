# AxentyBot - MVP

This repository contains a minimal MVP backend + frontend for a +EV alert system.
Features:
- 3 simple bots: matchOddsBot, overGoalsBot, underGoalsBot (use TheOddsAPI)
- Simple EV logic (placeholder models)
- SQLite storage for detected bets
- Dashboard served at /dashboard

How to deploy:
1. Create a GitHub repo and upload these files.
2. On Railway: New Project -> Deploy from GitHub repo -> select this repo.
3. Set environment variables (API_FOOTBALL_KEY, THEODDS_KEY).
4. Start command: `npm start`
5. Open `/dashboard` and `/runBots`.

Notes:
- This is an MVP. Model probabilities are placeholders — improve with API-Football stats or StatsBomb for better ROI.
