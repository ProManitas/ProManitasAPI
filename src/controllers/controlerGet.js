//IMPORTS
const { sequelize, Op } = require('sequelize');
const { Adpost, Rating, Services, User } = require('../db');

const UserProperties = user => ({
  id: user.id,
  username: user.username,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  cellnumber: user.cellnumber,
  address: user.address,
  image: user.image
});

//----------------------------------USERS-------------------------
  //Devuelve todos los usuarios (Excepto los que pasaron por el borrado logico)
  getUsers = async () => {
    try {
      const response = await User.findAll();
      const filteredUsers = response.filter(u => !u.deleted);
      const userList = filteredUsers.map(UserProperties);
      return userList;
    } catch(error) {
      console.error(error);
      return { message: 'Ocurrió un error al buscar los usuarios' };
    };
  }
  //Devuelve todos los usuarios que no hayan realizado posteos
  getUsersWithoutRole = async () => {
    try {
      const response = await User.findAll();
      const filteredUsers = response.filter(u => !u.deleted && !u.role);
      const userList = filteredUsers.map(UserProperties);
      return userList;
    } catch(error) {
      console.error(error);
      return { message: 'Ocurrió un error al buscar los usuarios sin role' };
    };
  }
  //Devuelve todos los usuarios que hayan realizados posteos
  getUsersWithRole = async () => {
    try {
      const response = await User.findAll();
      const filteredUsers = response.filter(u => !u.deleted && u.role);
      const userList = filteredUsers.map(UserProperties);
      return userList
    } catch(error) {
      console.error(error);
      return { message: 'Ocurrió un error al buscar los usuarios con role' };
    };
  }
  //Devuelve un usuario determinado por ID
  getUserId = async (req, res) => {
    const {id} = req.params
    try {
      const user = await User.findByPk(id);
     res.status(200).send({
      message: `Usuario con ID: ${id} ha sido encontrado`,
      data: user
     })
    } catch(error) {
      console.error(error);
      res.status(200).send({ message: `El usuario con ID ${id} no existe` });
    };
  }
//---------------------------------------------SERVICES-----------------------------
  //Devuelve todos los Servicios
  getServices = async (req, res) => {
    try {
      const service = await Services.findAll();
      res.status(200).send({
        message: 'All Services',
        data: await service
    }); 
    } catch(error) {
      console.error(error);
      res.status(400).send({ message: 'Ocurrió un error al buscar los servicios' });
    };
  }
  
  //Devuelve un determinado servicio 
  getServiceId =  async (req, res) => {
    const { id } = req.params;

    try {
      const response = await Services.findByPk(id);
      res.status(200).send({
        message: `Servicio con ID: ${id} ha sido encontrado`,
        data: await response
    });
    } catch(error) {
      console.error(error)
      res.status(400).send({ message: 'Ocurrió un error al buscar un servicio por ID' }) 
    };
  }
//------------------------------------------ADPOSTS-----------------------
  //Devuelve todos los posteos
  getAdposts = async (req , res) => {
    try {
      const post = await Adpost.findAll();

      res.status(200).send({
        mesagge: 'All Adposts',
        data: await post
    });
    } catch (error) {
      console.log(error);
      res.status(200).send({ message: 'Ocurrio un error al buscar los posteos' });
    };
  }

module.exports = {
  getUsers,
  getUserId,
  getAdposts,
  getServices,
  getServiceId,
  getUsersWithRole,
  getUsersWithoutRole
};