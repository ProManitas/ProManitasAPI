//IMPORTS
require('dotenv').config();
const {DB_USER, DB_HOST, DB_PASSWORD, DB} = process.env;
const { Sequelize } = require('sequelize');
//MODELS
const AdpostModel = require('./models/Adpost.js');
const RatingModel = require('./models/Rating.js');
const ServicesModel = require('./models/Services.js');
const UserModel = require('./models/User.js');
const ContractModel = require('./models/Contract.js')

//CONN DB POSTGRESQL
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging : false,
    native:false
});

//INJECT MODELS TO DB
AdpostModel(database);
RatingModel(database);
ServicesModel(database);
UserModel(database);
ContractModel(database)

//RELATIONS MODELS
const { Adpost, Rating, Services, User, Contract} = database.models;

//RELATIONS USERS
User.hasMany(Adpost);
Adpost.belongsTo(User);

//RELATIONS SERVICES
Services.hasMany(Adpost);
Adpost.belongsTo(Services);

//RELATIONS RATINGS
Adpost.hasMany(Rating);
Rating.belongsTo(Adpost);

//RELATIONS USER AND RATINGS
User.hasMany(Rating);
Rating.belongsTo(User);

//RELATION USER && SERVICES
User.belongsToMany(Services, {through: 'UserServices', timestamps: false});
Services.belongsToMany(User, {through: 'UserServices', timestamps: false});

//RELATION USER && ADPOSTS
User.belongsToMany(Adpost, {through: 'FinishedService'});
Adpost.belongsToMany(User, {through: 'FinishedService'});

//RELATION USER && CONTRACT
User.hasMany(Contract);
Contract.belongsTo(User);

//RELATION USER && RATING
User.hasMany(Rating)
Rating.belongsTo(User)

//Relation RATING && ADPOST
Adpost.hasMany(Rating)
Rating.belongsTo(Adpost)

module.exports = {
    ...database.models, 
    database
};