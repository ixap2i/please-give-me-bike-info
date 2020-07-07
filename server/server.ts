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
const bikedetail = require('./goo-bike.service.ts');
console.log(bikedetail);
import BikeDetail from "goo-bike.service.mjs"
var bk50ccs = '';
var bk125ccs = '';
var bk250ccs = '';
var bk400ccs = '';
var specs = [];
var page_spec = '';
var specs_50ccs = [];

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1800 })
  await page.goto('http://motorcycle.goobike.com/motorcycle/bike/suzuki.html')

  bk50ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(2) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  bk125ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(3) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  bk250ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(4) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })
  bk400ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(5) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })

  for(var i = 0; i < bk50ccs.length; i++) {
    // http://motorcycle.goobike.com/web/motorcycle/search_syasyu_area.php?type=&exhaust1=&exhaust2=&price_low=0&price_high=9999&model=1030002
    await page.goto('http://motorcycle.goobike.com/web/motorcycle/summary.php?maker=&type=&exhaust1=&exhaust2=&model='+bk250ccs[i][1]+'&baitai_name=&kind=&price_low=&price_high=&new_flg=&year_exhaust_flg=&nenshiki_start=&nenshiki_end=')
    specs = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2)', anchors => { return anchors.map(a => { return new BikeDetail(a.textContent.trim().split(/\n/)); }) })
    // specs = await page.$$eval('#result > table > tbody > tr > td.modelName', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.children[0].href] }) })
    specs_50ccs.push(specs);
  }

  // await page.goto(specs[5][1])
  // page_spec = await page.$$eval('#subCarInfoList', anchors => { return anchors.map(a => { return a.textContent.trim() }) })
  // console.log(page_spec)
  await browser.close()
})()

app.get('/goo_bikes', (req, res) => {
  request.get(options,
  function(err, resp, requ) {
    res.send(specs_50ccs.flat());
  });
})
