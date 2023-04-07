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
// server.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

server.use(express.urlencoded({extended : true}))

server.use('/', cors(), router)

module.exports = server;
