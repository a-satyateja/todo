const express = require('express');
const bodyParser = require('body-parser');

// MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://satyateja:mlab123@cluster0-shard-00-00-fbbt4.mongodb.net:27017,cluster0-shard-00-01-fbbt4.mongodb.net:27017,cluster0-shard-00-02-fbbt4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const todoSchema = new Schema({
    baseKey: ObjectId,
    description: String,
    group: String,
    priority: String,
    type: String,
    targetDate: String 
    });
const todoModel = mongoose.model('ToDo', todoSchema);


const app = express();
const port = 3030;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();


app.use(jsonParser ,function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/todo', (req, res) => {
    todoModel.find({}, (err, docs)=> {
        if (err) return handleError(err);
        res.send(docs);
    })
});

app.post('/api/todo', jsonParser, function (req, res) {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);
    todoModel.create(req.body, function (err, small) {
        if (err) return handleError(err);
        // saved!
        console.log('new todo added');
        res.sendStatus(200);
      });
    // res.send('welcome, ' + req.body.name);
});




app.listen(port, () => console.log(`custom app listening on port ${port}!`));
