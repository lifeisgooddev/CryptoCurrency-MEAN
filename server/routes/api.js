const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
const request = require('request');
let db;
// CONNECT
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) return console.log(err);
    db = client.db('mean')
});

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};
// Response handling
let response = {
  status: 200,
  data: [],
  token: null,
  message: ''
};

//user
router.post('/register', function(req,res,next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return next(err);
      req.body.password = hash;
      db.collection('users').insertOne(req.body).then(user => {
        console.log("Successfully registered!");
        response.data = user;
        response.status = 200;
        res.json(response);
      }).catch((err) => {
        sendError(err, res);
      })
    })
  });
});
router.post('/login',function(req,res) {
  let email = req.body.email;
  let enteredPassword = req.body.password;
  db.collection('users').findOne({email: email}).then(function (found) {
    if (found) {
      bcrypt.compare(enteredPassword, found.password, function (err, equal) {
        response.data = equal;
        if(equal){
          response.status = 200;
          response.token = generateJwt(found);
          response.message = found.oib;
          res.json(response);
        }
        else{
          response.status = 401;
          res.json(response);
        }
      })
    }
    else {
      response.data = false;
      response.status = 404;
      res.json(response);
    }
  });
});
generateJwt = function(found){

  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    email: found.email,
    oib: found.oib,
    name: found.firstname + " " + found.lastname,
    exp: parseInt(expiry.getTime() / 1000),
  }, "SUPERTAJNA");
};

//RESTful /users
router.route('/users/:oib')
  .get(function (req, res) {
      db.collection('users')
        .find({oib: req.params.oib})
        .toArray()
        .then((results) => {
          response.data = results;
          res.json(response.data);
        })
        .catch((err) => {
          sendError(err, res);
        });
  })
  .put(function(req,res){
    db.collection('users').update(
      {
        oib:req.params.oib
      },
      {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          oib: req.body.oib,
          birthdate: req.body.birthdate,
          address: req.body.address,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password
      }
      , function(error, success){
      if(error) sendError(error,success);
        if(success){
          response.status = 200;
          res.json(response);
        }
        else{
          response.status = 500;
          res.json(response);
        }
    })
  });

//RESTful /accounts
router.route('/accounts/:oib')
  .get(function(req, res){
  db.collection('accounts')
    .find({oib: req.params.oib})
    .toArray()
    .then((results) => {
      response.data = results;
      res.json(response.data);
    })
    .catch((err) => {
      sendError(err, res);
    });
})
  .post(function(req,res){
    db.collection('accounts').insertOne(req.body).then(acc => {
      console.log("Successfully created account!");
      response.data = acc;
      response.status = 200;
      res.json(response);
    }).catch((err) => {
      sendError(err, res);
    })
  })
  .delete(function(req,res){
    console.log(req.headers.brojracuna);
    db.collection('accounts').deleteOne({brojRacuna: req.headers.brojracuna}).then(acc => {
      console.log("Account removed!");
      response.data = acc;
      response.status = 200;
      res.json(response);
    }).catch((err) => {
      sendError(err, res);
    })
  });

//DOHVAT TRANSAKCIJA KORISNIKA
router.route('/transactions/:oib')
  .get(function (req, res){
  db.collection('transactions')
    .find({oib: req.params.oib})
    .toArray()
    .then((results) => {
      response.data = results;
      res.json(response.data);
    })
    .catch((err) => {
      sendError(err, res);
    });
})
  .post(function(req,res){
      db.collection('transactions').insertOne(req.body).then(tr => {
        console.log("Successfully created transaction!");
        response.data = tr;
        response.status = 200;
        res.json(response);
      }).catch((err) => {
        sendError(err, res);
      })
    });
//DOHVAT TRANSAKCIJA ZA RAČUN
router.get('/transactionsForAccount/:brojRacuna', (req, res) => {
  db.collection('transactions')
    .find({brojRacuna : req.params.brojRacuna})
    .toArray()
    .then((results) => {
      response.data = results;
      res.json(response.data);
    })
    .catch((err) => {
      sendError(err, res);
    });
});

router.get('/accountInfo/:brojRacuna', (req,res) => {
  console.log(req.params.brojRacuna);
  db.collection('accounts')
  .find({brojRacuna : req.params.brojRacuna})
  .toArray()
  .then((results) => {
    response.data = results;
    res.json(response.data);
  })
  .catch((err) => {
    sendError(err, res);
  });
});

//SPAJANJE NA VANJSKE APIje
const options = {
  url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
  }
};
const options2 = {
  url: 'http://api.hnb.hr/tecajn',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
  }
};

let endDate = formatDate(new Date());
let startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
startDate = formatDate(startDate);
function formatDate(date) {
  let d = (date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
const options3 = {
  url:"https://www.cryptocurrencychart.com/api/coin/history/363/"+startDate+"/"+endDate+"/price/usd",
  method: 'GET',
  headers: {
    'Key':'b9bc4848ca8256c85c75c3a7664b25a9',
    'Secret': '81cf6630e074f7989b1d3ecda977d081'
  }
};
const options4 = {
  url:"https://www.cryptocurrencychart.com/api/coin/history/364/"+startDate+"/"+endDate+"/price/usd",
  method: 'GET',
  headers: {
    'Key':'b9bc4848ca8256c85c75c3a7664b25a9',
    'Secret': '81cf6630e074f7989b1d3ecda977d081'
  }
};
const options5 = {
  url:"https://www.cryptocurrencychart.com/api/coin/history/365/"+startDate+"/"+endDate+"/price/usd",
  method: 'GET',
  headers: {
    'Key':'b9bc4848ca8256c85c75c3a7664b25a9',
    'Secret': '81cf6630e074f7989b1d3ecda977d081'
  }
};

router.get('/cryptoRate',function(req,res){
  request(options,function(err,response,body){
    let json = JSON.parse(body);
    res.json(json);
  })
});
router.get('/exchangeRate',function(req,res){
  request(options2,function(err,response,body){
    let json = JSON.parse(body);
    res.json(json);
  })
});
router.get('/chartRateBTC',function(req,res) {
  request(options3, function (err, response, body) {
    let json = JSON.parse(body);
    res.json(json);
  });
});
router.get('/chartRateXRC',function(req,res){
    request(options4,function(err,response,body){
      let json = JSON.parse(body);
      res.json(json);
    });
});
router.get('/chartRateETH',function(req,res){
      request(options5,function(err,response,body){
        let json = JSON.parse(body);
        res.json(json);
      })
});

module.exports = router;
