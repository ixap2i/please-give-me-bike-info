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
  url: "http://motorcycle.goobike.com/motorcycle/bike/suzuki.html",
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;¥",
    "Accept": "application/x-www-form-urlencoded,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7"
  },
  json: true
};

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1800 })
  await page.goto('http://motorcycle.goobike.com/motorcycle/bike/suzuki.html')
  var counter = {
    index: null,
    getCount: function() {
      return this.index++;
    }
  }
  const _50ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(2) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  const _125ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(3) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  const _250ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(4) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  const _400ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(5) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  console.log(_50ccs)
  console.log(_125ccs)
  console.log(_250ccs)
  console.log(_400ccs)

  await page.goto('http://motorcycle.goobike.com/web/motorcycle/summary.php?maker=&type=&exhaust1=&exhaust2=&model='+_250ccs[0][1]+'&baitai_name=&kind=&price_low=&price_high=&new_flg=&year_exhaust_flg=&nenshiki_start=&nenshiki_end=')
  const specs = await page.$$eval('#result > table > tbody > tr > td.modelName', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.children[0].href] }) })
  console.log(specs)

  await page.goto(specs[0][1])
  const page_spec = await page.$$eval('#subCarInfoList', anchors => { return anchors.map(a => { return a.textContent.trim() }) })
  console.log(page_spec)
  await browser.close()
})()

app.get('/goo_bikes', (req, res) => {
  request.get(options,
  function(err, resp, requ) {
    res.send(resp.body);
  });
})
