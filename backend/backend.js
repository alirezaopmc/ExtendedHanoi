const express = require('express');
const cors = require('cors');
const app = express();

const solve = require('./core/caller');

app.use(express.json());
app.use(cors());

app.post('/', function (req, res) {
  const solvedString = solve(req.body.hanoi);
  res.send(`${solvedString}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
