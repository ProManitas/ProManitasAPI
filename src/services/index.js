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
const withRole = async (model) => {
    return await User.findAll({where: {role: true, deleted: false}, attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience' , 'role']});
};

//ALL USER WITHOUT ROLE
const withoutRole = async (model) => {
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
                attributes: ['username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience']
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



module.exports = {
    allInf,
    withRole,
    withoutRole,
    pagination,
    filterID,
    filterName
}