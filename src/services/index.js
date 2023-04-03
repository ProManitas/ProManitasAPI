//IMPORTS
const { Op } = require('sequelize');
const { Adpost, Rating, Services, User } = require('../db');

//ALL USERS
const allInf = async (model) => {
    
    switch (model) {
        case 'User':
            return await User.findAll({where: {deleted: false}, attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience']});
            
        case 'Services':
            return await Services.findAll();
                
        case 'Adpost':
            return await Adpost.findAll({where: {deleted: false}, attributes: ["name", "description", "UserId", "ServiceId"]});
    };
};

//ALL USER WITH ROLE
const withRole = async (model) => {
    return await User.findAll({where: {role: true, deleted: false}, attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience' , 'role']});
};

//ALL USER WITHOUT ROLE
const withoutRole = async (model) => {
    return await User.findAll({where: {role: false, deleted: false}, attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience' , 'role']})
};

//FILTER BY ID
const filterID = async (model , id) => {
    switch (model) {
        case 'User':
            return await User.findByPk(id, {where: { deleted: false }, attributes: ['username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience']});

        case 'Services':
            return await Services.findByPk(id);    
    };
};

//FILTER BY NAME 
const filterName = async (model, name) => {
    switch (model) {
        case 'User':
            return await User.findAll({where: { firstname: { [Op.like]: `%${name}%`}}});
            
        case 'Adpost':
            return await Adpost.findAll({where: { name: { [Op.like]: `%${name}%`}}});
    };
};



module.exports = {
    allInf,
    withRole,
    withoutRole,
    filterID,
    filterName
}