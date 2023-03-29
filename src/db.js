//IMPORTS
require('dotenv').config();
const {DB_USER, DB_HOST, DB_PASSWORD, DB} = process.env;
//DB
const { Sequelize } = require('sequelize');
const AdpostModel = require('./models/Adpost.js');
const RatingModel = require('./models/Rating.js');
const ServicesModel = require('./models/Services.js');
const UserModel = require('./models/User.js');

//CONN DB POSTGRESQL
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging : false,
    native:false // permite que Sequelize sepa que podemos usar pg-native para 30% más de velocidad
});

//INJECT MODELS TO DB
AdpostModel(database)
RatingModel(database)
ServicesModel(database)
UserModel(database)

//RELATIONS MODELS
const { Adpost, Rating, Services, User} = database.models;

//RELATIONS USERS
User.hasMany(Adpost) 
Adpost.belongsTo(User)

//RELATIONS SERVICES
Services.hasMany(Adpost)
Adpost.belongsTo(Services)

//RELATIONS RATINGS
Adpost.hasMany(Rating)
Rating.belongsTo(Adpost)

//RELATIONS USER AND RATINGS
User.hasMany(Rating)
Rating.belongsTo(User)


module.exports = {
    ...database.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    database  // para importart la conexión { conn } = require('./db.js');
};