const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const payjp = require('payjp')('sk_test_c62fade9d045b54cd76d7036');

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/pay', function (req, res) {
  console.log(req.body);
  const query = {
    amount: 30800, // 本来はリクエストの中身から取得,
    currency: 'jpy',
    card: {
      number: req.body.details.cardNumber,
      exp_month: req.body.details.expiryMonth,
      exp_year: req.body.details.expiryYear,
      cvc: req.body.details.cardSecurityCode
    }
  };
  payjp.charges.create(query).then((result) => {
    // サーバー側での決済成功時に必要な処理 etc
    res.json({success: true});
  }).catch((err) => {
     console.error(err);
     res.json({success: false});
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
