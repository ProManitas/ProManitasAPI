require('dotenv').config();
const { Sequelize } = require('sequelize');
const {DB_USER, DB_HOST, DB_PASSWORD, DB} = process.env
const ClientsModel = require('./models/Clients.js');
const  ProvidersModel = require('./models/Providers.js');


const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging : false
})


ClientsModel(database);
ProvidersModel(database);


module.exports = {
    // ...sequelize.models,
    database
}