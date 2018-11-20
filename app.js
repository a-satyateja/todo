const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json()

app.use(jsonParser ,function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/test', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', jsonParser, function (req, res) {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400)
    res.send('welcome, ' + req.body.name)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
