// TODO: make this work.
// if you go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// {
//   "name": "Simba",
//   "id": 1,
//   "age": 3,
//   "pride": "the cool cats",
//   "gender": "male"
// }
var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', (req, res) => {
  res.send(lions);
});

app.get('/lions/:id', (req, res) => {
  var lion = _.find(lions, { id: req.params.id });
  console.log(lion);
  res.send(lion || {});
});

app.post('/lions', (req, res) => {
  var newLion = req.body;
  id++;
  newLion.id = id + '';
  lions.push(newLion);
  res.status(201).send(newLion);
});

app.put('/lions/:id', (req, res) => {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var lion = _.findIndex(lions, { id: req.params.id });
  // console.log(lions[lion]);
  
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', (req, res) => {
  var lion = _.findIndex(lions, { id: req.params.id });
  if (!lions[lion]) {
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.send(deletedLion);
  }
});

app.listen(3000);
console.log('on port 3000');