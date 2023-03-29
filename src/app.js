//IMPORTS 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')


const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());

server.use('/', router)

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

module.exports = server;