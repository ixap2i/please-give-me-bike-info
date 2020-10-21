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
var bk50ccs = '';
var bk250ccs = '';
var bk400ccs = '';
var specs = [];
var spec_img = '';
var spec_link = '';
var specs_50ccs = [];
var specs_250ccs = [];
var specs_400ccs = [];

var bike_scraping_50 = (async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1800 })
    await page.goto('http://motorcycle.goobike.com/motorcycle/bike/suzuki.html')

    bk50ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(2) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })

    for(var i = 0; i < bk50ccs.length; i++) {
      // http://motorcycle.goobike.com/web/motorcycle/search_syasyu_area.php?type=&exhaust1=&exhaust2=&price_low=0&price_high=9999&model=1030002

      Promise.all([await page.goto('http://motorcycle.goobike.com/web/motorcycle/summary.php?maker=&type=&exhaust1=&exhaust2=&model='+bk50ccs[i][1]+'&baitai_name=&kind=&price_low=&price_high=&new_flg=&year_exhaust_flg=&nenshiki_start=&nenshiki_end='),
      specs = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2)', anchors => { return anchors.map(a => { return a.textContent.trim().split(/\n/); }) })]);
      specs = specs.toString().replace(/("","",)+/g, '').replace(/(NEW|UP)/g, '').replace(/,{3,6}/g, '').split(/(?<=[a-zA-Z]),|,(?![0-9])/g);
      var new_specs = Array.from(specs);
      new_specs = new_specs.filter(el => { return el !== null && typeof(el) !== undefined && el !== ""; });
      spec_img = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2) > td.modelName > a > img', anchors => { return anchors.map(img => { return img.getAttribute('src'); }) })
      spec_link = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2) > td.modelName > a', anchors => { return anchors.map(a => { return a.getAttribute('href'); }) })

      var data = '{"name":"'+new_specs[0].toString()+'",'
      +'"color":"'+new_specs[1].toString()+'",'
      +'"distance":"'+new_specs[2].toString()+'",'
      +'"engine":"'+new_specs[3].toString()+'",'
      +'"status":"'+new_specs[4].toString()+'",'
      +'"place":"'+new_specs[5].toString()+'",'
      +'"price":"'+new_specs[6].toString()+'",'
      +'"imgUrl":"'+spec_img[0].toString()+'",'
      +'"detailLink":"'+spec_link[0].toString()+'"'
      +'}'
      specs_50ccs.push(data);
    }
  } catch(e) {
    console.log(e);
  } finally {
    await browser.close()
  }
})()
var bike_scraping_250 = (async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1800 })
    await page.goto('http://motorcycle.goobike.com/motorcycle/bike/suzuki.html')

    bk250ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(4) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })

    for(var i = 0; i < bk250ccs.length; i++) {
      // http://motorcycle.goobike.com/web/motorcycle/search_syasyu_area.php?type=&exhaust1=&exhaust2=&price_low=0&price_high=9999&model=1030002
      Promise.all([await page.goto('http://motorcycle.goobike.com/web/motorcycle/summary.php?maker=&type=&exhaust1=&exhaust2=&model='+bk250ccs[i][1]+'&baitai_name=&kind=&price_low=&price_high=&new_flg=&year_exhaust_flg=&nenshiki_start=&nenshiki_end='),
      specs = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2)', anchors => { return anchors.map(a => { return a.textContent.trim().split(/\n/); }) })]);
      specs = specs.toString().replace(/("","",)+/g, '').replace(/(NEW|UP)/g, '').replace(/,{3,6}/g, '').split(/(?<=[a-zA-Z]),|,(?![0-9])/g);
      var new_specs = Array.from(specs);
      new_specs = new_specs.filter(el => { return el !== null && typeof(el) !== undefined && el !== ""; });
      spec_img = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2) > td.modelName > a > img', anchors => { return anchors.map(img => { return img.getAttribute('src'); }) })
      spec_link = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2) > td.modelName > a', anchors => { return anchors.map(a => { return a.getAttribute('href'); }) })
      var data = '{"name":"'+new_specs[0].toString()+'",'
      +'"color":"'+new_specs[1].toString()+'",'
      +'"distance":"'+new_specs[2].toString()+'",'
      +'"engine":"'+new_specs[3].toString()+'",'
      +'"status":"'+new_specs[4].toString()+'",'
      +'"place":"'+new_specs[5].toString()+'",'
      +'"price":"'+new_specs[6].toString()+'",'      +'"imgUrl":"'+spec_img[0].toString()+'",'+
      +'"detailLink":"'+spec_link[0].toString()+'"'
      +'}'
      specs_250ccs.push(data);
    }
  } catch(e) {
    console.log(e);
  } finally {
    await browser.close()
  }
})()
var bike_scraping_400 = (async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1800 })
    await page.goto('http://motorcycle.goobike.com/motorcycle/bike/suzuki.html')

    bk400ccs = await page.$$eval('#main > form:nth-child(2) > div > dl:nth-child(5) > dd > ul > li', anchors => { return anchors.map(a => { return [a.textContent.trim(), a.firstChild.value] }) })

    for(var i = 0; i < bk400ccs.length; i++) {
      // http://motorcycle.goobike.com/web/motorcycle/search_syasyu_area.php?type=&exhaust1=&exhaust2=&price_low=0&price_high=9999&model=1030002
      Promise.all([await page.goto('http://motorcycle.goobike.com/web/motorcycle/summary.php?maker=&type=&exhaust1=&exhaust2=&model='+bk400ccs[i][1]+'&baitai_name=&kind=&price_low=&price_high=&new_flg=&year_exhaust_flg=&nenshiki_start=&nenshiki_end='),
      specs = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2)', anchors => { return anchors.map(a => { return a.textContent.trim().split(/\n/); }) })]);
      specs = specs.toString().replace(/("","",)+/g, '').replace(/(NEW|UP)/g, '').replace(/,{3,6}/g, '').split(/(?<=[a-zA-Z]),|,(?![0-9])/g);
      spec_img = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2) > td.modelName > a > img', anchors => { return anchors.map(img => { return img.getAttribute('src'); }) })
      spec_link = await page.$$eval('#result > table:nth-child(4) > tbody > tr:nth-child(2) > td.modelName > a', anchors => { return anchors.map(a => { return a.getAttribute('href'); }) })
      var new_specs = Array.from(specs);
      new_specs = new_specs.filter(el => { return el !== null && typeof(el) !== undefined && el !== ""; });

      console.log('nspec: '+new_specs);
      var data = '{"name":"'+new_specs[0].toString()+'",'
      +'"color":"'+new_specs[1].toString()+'",'
      +'"distance":"'+new_specs[2].toString()+'",'
      +'"engine":"'+new_specs[3].toString()+'",'
      +'"status":"'+new_specs[4].toString()+'",'
      +'"place":"'+new_specs[5].toString()+'",'
      +'"price":"'+new_specs[6].toString()+'",'
      +'"imgUrl":"'+spec_img[0].toString()+'",'
      +'"detailLink":"'+spec_link[0].toString()+'"'
      +'}'
      console.log('data: '+data);
      specs_400ccs.push(data);
    }
  } catch(e) {
    console.log(e);
  } finally {
    await browser.close()
  }
})()
// 非同期で取得しているので、排気量別に取得したものは別々にページに返す必要がある
bike_scraping_50
bike_scraping_250
bike_scraping_400
app.get('/goo_bikes_50', (req, res) => {
  request.get(options,
  function(err, resp, requ) {
    res.send(specs_50ccs);
  });
})
app.get('/goo_bikes_250', (req, res) => {
  request.get(options,
  function(err, resp, requ) {
    res.send(specs_250ccs);
  });
})
app.get('/goo_bikes_400', (req, res) => {
  request.get(options,
  function(err, resp, requ) {
    res.send(specs_400ccs);
  });
})
