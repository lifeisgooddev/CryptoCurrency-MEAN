const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');

//API file for interacting with MongoDB
const api = require('./server/routes/api');

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);
app.use(cors);

/*app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
  next();
});*/


//send all other requests to the Angular app
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port',port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost: ${port}`));
