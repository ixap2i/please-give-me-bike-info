const express = require('express')
const app = express();

// start our server on port 4201
app.listen(4201, function() {
  console.log("Server now listening on 4201");
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if('OPTIONS' === req.method) {
      res.sendStatus(200);
  } else {
      console.log(`${req.ip} ${req.method} ${req.url}`);
      next();
  }
})
// Handle POST requests that come in formatted as JSON
app.use(express.json())
// A default hello word route
app.get('/', (req, res) => {
    res.send({hello: 'world'});
});
app.get('/bikes', (req, res) => {
  res.json([
    { name: 'GSX250R', maker: 'SUZUKI', weight: 134, bclass: 250},
    { name: 'gixxer', maker: 'SUZUKI', weight: 134, bclass: 150 },
    { name: 'gixxer sf 250', maker: 'SUZUKI', weight: 184, bclass: 250 },
    { name: 'R25', maker: 'YAMAHA', weight: 184, bclass: 250 }
  ]);
})

var request = require('request');
var options = {
  uri: "https://www.goobike.com/cgi-bin/search/search_syasyu.cgi",
  headers: {
    "Content-type": "text/html;charset=EUC-JP",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7"
  },
  json: {
    "maker_cd": "3", "maker": "3", "baitai_name": "", "kind": "", "new_exhaust": "4", "exhaust1": "", "exhaust2": "", "type": "", "genre_id_new": "", "genre_id": "", "group_flag": ""
  }
};
app.get('/goo_bikes', (req, res) => {
  console.log('test')
  request.post(options, function(err, resp, req) {
    res.send(resp.body)
    console.log(resp.body)
  })
})
