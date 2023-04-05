//IMPORTS
const { sequelize, Op } = require('sequelize');
const { Adpost, Rating, Services, User } = require('../db');
const { allInf, withRole, withoutRole, filterID, filterName, pagination } = require('../services/index');

//----------------------------------USERS-------------------------
//Devuelve todos los usuarios (Excepto los que pasaron por el borrado logico)
const getUsers = async (req, res) => {

  try {
  //USER WITH ROLE && WITHOUT ROLE
    if(req.query.hasOwnProperty('role')){

      const { role } = req.query;

      if( role == 'true' ){
          res.status(200).send({
              message: 'User with Role',
              data: await withRole()
          });
          return;
      };
      if( role == 'false' ){
          res.status(200).send({
              message: 'User without Role',
              data: await withoutRole()
          });
          return;
      };
    };

    if(req.query.hasOwnProperty('name')){
      const { name } = req.query;
      const response = await filterName('User', name);
      
      if( response[0] !== undefined ){
        res.status(200).send({
          message: `${name} users`,
          data: response
        });
        return;
      };

      res.status(400).send({
        message: `${name} users not found`,
      });
      return;
    };

    //Paginado de los usuarios
    if(req.query.hasOwnProperty('pageNumber') && req.query.hasOwnProperty('pageSize')){
      const { pageNumber, pageSize } = req.query;
      
      const limit = parseInt(pageSize);

      const pagePagination = await pagination('User',pageNumber, pageSize)

      const count = await User.count();
      const totalPages = Math.ceil(count / limit);
  
      res.status(200).send({
        message: {
          page: parseInt(pageNumber),
          pageSize: limit, totalPages,
          totalCount: count
        },
        data: pagePagination
      });
      return;
    };
  
    res.status(200).send({
      message: 'All Users',
      data: await allInf('User'),
    });

  } catch(error) {

    console.error(error);
    res.status(400).send({
      message: 'Ocurrió un error al buscar los usuarios',
      error: error.message
    });

  };
};

//Devuelve un usuario determinado por ID
const getUserId = async (req, res) => {
  const {id} = req.params;

  try {
    const response = await filterID('User', id);

    if(response !== null ){
      res.status(200).send({
        message: `User with ID: ${id} found`,
        data: response
      });
      return;
    };

    res.status(404).send({
      message: 'User not find',
      data: undefined
    });

  } catch (error) {
    res.status(500).send({
      error: 'Internal server error',
    });
  };
};

//---------------------------------------------SERVICES-----------------------------
  //Devuelve todos los Servicios
const getServices = async (req, res) => {
  try {
    res.status(200).send({
      message: 'All Services',
      data: await allInf('Services')
    }); 
  } catch(error) {
    console.error(error);
    res.status(400).send({ message: 'Ocurrió un error al buscar los servicios' });
  };
};
  
  //Devuelve un determinado servicio 
const getServiceId =  async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send({
      message: `Servicio con ID: ${id} ha sido encontrado`,
      data: await filterID('Services', id)
    });
  } catch(error) {
    console.error(error);
    res.status(400).send({ message: 'Ocurrió un error al buscar el servicios' });
  };
};

//------------------------------------------ADPOSTS-----------------------
  //Devuelve todos los posteos
const getAdposts = async (req , res) => {
  try {
    
    if(req.query.hasOwnProperty('name')){
      const { name } = req.query;
      const response = await filterName('Adpost', name);
    
      if( response[0] !== undefined ){
        res.status(200).send({
          message: `${name} users`,
          data: response
        });
      return;
      };
    };

    if(req.query.hasOwnProperty('pageNumber') && req.query.hasOwnProperty('pageSize')){
      const { pageNumber, pageSize } = req.query;
      
      const limit = parseInt(pageSize);

      const pagePagination = await pagination('Adpost',pageNumber, pageSize)

      const count = await User.count();
      const totalPages = Math.ceil(count / limit);
  
      res.status(200).send({
        message: {
          page: parseInt(pageNumber),
          pageSize: limit, totalPages,
          totalCount: count
        },
        data: pagePagination
      });
      return;
    };

    res.status(200).send({
      mesagge: 'All Adposts',
      data: await allInf('Adpost')
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Ocurrio un error al buscar los posteos' });
  };
};

const getAdpostsId = async (req, res) =>{
  const {id} = req.params
  try {
    res.status(200).send({
      message:  `Se ha encontrado el Adpost con ID: ${id}`,
      data: await filterID(Adpost)
    })
  } catch (error) {
    res.status(400).send({message:  `No se ha podido encontrar el Adpost con ID: ${id}`})
  }
};

module.exports = {
  getUsers,
  getUserId,
  getAdposts,
  getServices,
  getServiceId,
  getAdpostsId,
};