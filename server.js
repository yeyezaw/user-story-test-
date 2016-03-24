//Express modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

//Connect database
mongoose.connect(config.database, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Successfully connected to database');
    }
});
//Middlewares
//============
//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Morgan
app.use(morgan('dev'));


//Routes
app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port, function(err){
    if(err){
       console.log(err);
    }else {
      console.log('server is running on port: ' + config.port);
    }
});
