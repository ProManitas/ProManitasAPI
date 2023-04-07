//IMPORTS
const { Op } = require('sequelize');
const { Adpost, Rating, Services, User } = require('../db');

//ALL USERS
const allInf = async (model) => {
    
    switch (model) {
        case 'User':
            return await User.findAll({
                where: {deleted: false}, 
                attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience']
            });
            
        case 'Services':
            return await Services.findAll();
                
        case 'Adpost':
            return await Adpost.findAll({
                where: {deleted: false}, 
                attributes: ["id", "name", "description","image", "UserId", "ServiceId"]
            });
    };
};

//ALL USER WITH ROLE
const withRole = async () => {
    return await User.findAll({where: {role: true, deleted: false}, attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience' , 'role']});
};

//ALL USER WITHOUT ROLE
const withoutRole = async () => {
    return await User.findAll({
        where: {role: false, deleted: false}, 
        attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience' , 'role']
    });
};

//PAGINATION
const pagination = async (model, pageNumber, pageSize) => {
    const limit = parseInt(pageSize);
    const offset = (parseInt(pageNumber) - 1) * limit;

    switch (model) {
        case 'User':
            
            return await User.findAll({
            limit,
            offset,
            where: {deleted: false},
            attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience'],
            order: [['username', 'ASC']],
            });
            
        case 'Adpost' :
            
            return await Adpost.findAll({
            limit,
            offset,
            where: {deleted: false},
            attributes: ["id","name", "description","image", "UserId", "ServiceId"],
            order: [['name', 'ASC']],
            });
            
        default:
            break;
    };
};


//FILTER BY ID
const filterID = async (model , id) => {
    switch (model) {
        case 'User':
            return await User.findByPk(id, {
                where: { deleted: false }, 
                attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience', 'deleted']
            });

        case 'Services':
            return await Services.findByPk(id); 
            
        case 'Adpost':
            return await Adpost.findByPk(id, {where: {deleted: false},
                attributes: ["id","name", "description","image", "UserId", "ServiceId"]})
        };
};

//FILTER BY NAME 
const filterName = async (model, name) => {
    switch (model) {
        case 'User':
            return await User.findAll({
                where: { firstname: { [Op.like]: `%${name}%`}}
            });
            
        case 'Adpost':
            return await Adpost.findAll({
                where: { name: { [Op.like]: `%${name}%`}}
            });
    };
};

const login = async (email, password) =>{
    return await User.findOne({where: {email : email, password : password}})
};

const createNew = async (model, req) => {
    const attributes = req.body
    switch (model) {
        case 'User':
        return await User.create({
          username: attributes.username,
          firstname: attributes.firstname,
          lastname: attributes.lastname,
          email: attributes.email,
          password: attributes.password,
          cellnumber: attributes.cellnumber,
          address: attributes.address,
          image: attributes.image,
          service: attributes.service,
          role: attributes.role,
        });


      case 'Services':
        return await Services.create({
          name: attributes.name,
        });


      case 'Adpost':
        return await Adpost.create({
          name: attributes.name,
          description: attributes.description,
          image: attributes.image,
        });

      default:
        throw new Error('Modelo no válido');
    }
  };
  

module.exports = {
    allInf,
    withRole,
    withoutRole,
    pagination,
    filterID,
    filterName,
    login, 
    createNew
}