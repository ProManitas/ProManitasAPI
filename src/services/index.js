//IMPORTS
const { Op } = require('sequelize');
const { Adpost, Rating, Services, User, Contract } = require('../db');
const cloudinary = require('cloudinary').v2;
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

        case 'Contract':
          return await Contract.findAll({attributes: ['id', 'commencementDate', 'terminationDate', 'payment', 'UserId']})

        default:
            throw new Error('Modelo no válido');
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
            throw new Error('Modelo no válido');
            
    };
};


//FILTER BY ID
const filterID = async (model , id) => {
    switch (model) {
        case 'User':
            return await User.findByPk(id, {
                where: { deleted: false }, 
                attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience', 'role']
            });

        case 'Services':
            return await Services.findByPk(id); 
            
        case 'Adpost':
            return await Adpost.findByPk(id, {where: {deleted: false},
                attributes: ["id","name", "description","image", "UserId", "ServiceId"]})
        
        case 'Contract':
          return await Contract.findByPk(id, {attributes: ['id', 'commencementDate', 'terminationDate', 'payment', 'UserId']})
        
        default:
            throw new Error('Modelo no válido');
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

        default:
            throw new Error('Modelo no válido');
            
    };
};

const login = async (email, password) =>{
    return await User.findOne({where: {email : email, password : password}})
};

//CREATE NEW USERS, NEW POSTS & NEW SERVICES
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

      case 'Contract':
        return await Contract.create({
          commencementDate : new Date(),
          payment : req.body.amount
        })
      default:
        throw new Error('Modelo no válido');
    }
  };

  //DELETE 
  const deleteFromModel = async (model, id) => {

    const find = await model.findOne({ where: { id } });

  if (!find) {
    throw new Error(`No se encontró ningún registro con el id ${id}`);
  }
  switch (model) {
    case User:
    return await User.update({deleted: true}, {where: {id: id}});

    case Adpost:          
    return await Adpost.update({deleted: true}, {where: {id: id}})

    default:
        throw new Error('Modelo no válido')
  }
};
  
//UPDATE
const updateModel = async (model, id, req) => {

    const find = await model.findOne({ where: { id } });

    if (!find) {
      throw new Error(`No se encontró ningún registro con el id ${id}`);
    }
    const attributes = req.body
    switch (model) {
      case User:
        return await User.update({
          username: attributes.username,
          firstname: attributes.firstname,
          lastname: attributes.lastname,
          email: attributes.email,
          password: attributes.password,
          cellnumber: attributes.cellnumber,
          address: attributes.address,
          image: attributes.image
        }, { where: { id: id } });
       
      case Adpost:
        return await Adpost.update({
          name: attributes.name,
          description: attributes.description
        }, { where: { id: id } });
       
      default:
        throw new Error('Modelo no válido');
    };
  };

//ADD IMAGE
const addImage = async (model, req ) => {

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  const arr = [];

  if(req.body.hasOwnProperty('username')){
    for(i = 0 ; i < req.body.username.length ; i++){
      arr.push(req.body.username[i].charCodeAt())
    };
  }else{
    for(i = 0 ; i < req.body.name.length ; i++){
      arr.push(req.body.name[i].charCodeAt())
    };
  }
  
  

  const hashUrl = arr.toString().replace(/,/g, "");
  
  const uploadImage = cloudinary.uploader.upload(req.body.image, {public_id: hashUrl})

  // Generate 
  const Url = cloudinary.url(hashUrl, {
      width: 200,
      height: 200,
      Crop: 'fill'
  });

  switch (model) {

    case 'User':

      return await User.update({
        image: Url
      }, { where: { username: req.body.username } });
      
    case 'Adposts':

      return await Adpost.update({
        image: Url
      }, { where: { name: req.body.name } });
  
  };
};

const deleteInf = async (model) =>{
  switch (model) {
    case 'User':
      return await User.findAll({where: {deleted: true}})
      
    case 'Adpost':
      return await Adpost.findAll({where: {deleted: true}})

    default:
      throw new Error('Modelo no válido');
  }
}

module.exports = {
    allInf,
    withRole,
    withoutRole,
    pagination,
    filterID,
    filterName,
    login, 
    createNew,
    deleteFromModel,
    updateModel,
    addImage,
    deleteInf
}
