const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const botsRouter = require('./routes/bots');
const betsRouter = require('./routes/bets');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve dashboard static files
app.use('/dashboard', express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/', botsRouter);
app.use('/', betsRouter);

// root health
app.get('/', (req, res) => res.send('AxentyBot backend running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AxentyBot listening on ${PORT}`));
