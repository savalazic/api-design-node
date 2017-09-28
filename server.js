var express = require('express');

var app = express();

var jsonData = {
  count: 12,
  message: 'any'
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html', (err) => {
    if (err) {
      res.status(500).send(err);
    }
  })
});

app.get('/data', (req, res) => {
  res.send(jsonData);
});

app.listen(4000, () => {
  console.log('listening on 4000');
});

