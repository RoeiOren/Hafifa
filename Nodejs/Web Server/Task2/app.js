const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const functions = require('./functions');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static("./public"));

app.set('view engine', 'ejs');

app.post('/api/numbers/prime/validate', (req, res) => {
    res.send(functions.checkAllPrime(req.body));
})

app.get('/api/numbers/prime', (req, res) => {
    res.send(functions.getNFirstPrimes(req.query.amount));
})

app.get('/api/numbers/prime/display', (req, res) => {
    res.render('primes', {nums: functions.getNFirstPrimes(10)});
})

app.listen(process.env.SERVER_PORT || config.SERVER_PORT);