//IMPORTS
const { sequelize, Op } = require('sequelize')
const { Adpost, Rating, Services, User, UserServices,finishedService } = require('../db')

const UserProperties = user => ({
  id: user.id,
  username: user.username,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  cellnumber: user.cellnumber,
  address: user.address,
  image: user.image
})

module.exports = {
  //Devuelve todos los usuarios (Excepto los que pasaron por el borrado logico)
  getUsers: async () => {
    try {
      const response = await User.findAll()
      const filteredUsers = response.filter(u => !u.deleted)
      const userList = filteredUsers.map(UserProperties)
      return userList
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar los usuarios' }
    }
  },
  //Devuelve todos los usuarios que no hayan realizado posteos
  getUsersWithoutRole: async () => {
    try {
      const response = await User.findAll()
      const filteredUsers = response.filter(u => !u.deleted && !u.role)
      const userList = filteredUsers.map(UserProperties)
      return userList
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar los usuarios sin role' }
    }
  },
  //Devuelve todos los usuarios que hayan realizados posteos
  getUsersWithRole: async () => {
    try {
      const response = await User.findAll()
      const filteredUsers = response.filter(u => !u.deleted && u.role)
      const userList = filteredUsers.map(UserProperties)
      return userList
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar los usuarios con role' }
    }
  },
  //Devuelve un usuario determinado por ID
  getUserId: async (id) => {
    try {
      const response = await User.findAll()
      const user = response.find(user => user.id == id)
      if(user) {
        return UserProperties(user)
      } else {
        return null
      }
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar un usuario por ID' }
    }
  },
  //Devuelve todos los Servicios
  getServices: async () => {
    try {
      const response = await Services.findAll()
      const serviceList = response.map(service => ({
        id: service.id,
        name: service.name,
        image: service.image
      }))
      return serviceList
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar los servicios' }
    }
  },
  //Devuelve un determinado servicio
  getServiceId: async (id) => {
    try {
      const response = await Services.findAll()
      const service = response.find(service => service.id == id)
      if(service) {
        return {
          id: service.id,
          name: service.name,
          image: service.image
        }
      } else {
        return null
      }
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar un servicio por ID' }
    }
  },
  //Devuelve todos los Adpost
  getAdpost: async () => {
    try {
      const response = await Adpost.findAll()
      const filteredAdpost = await response.filter(ad=> !ad.delete)
      const adpostList = filteredAdpost.map(ad=> ({
        id: ad.id,
        name: ad.name,
        description: ad.description
      }))
      return adpostList
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar los avisos' }
    }
  },
  //Devuelve todos los avisos de un determinado servicio
  getAdpostFilterByService: async(serviceName)=>{
    try {
      console.log("todavia no termino")
    } catch(error) {
      console.error(error)
      return { message: 'Ocurrió un error al buscar los avisos' }
    }
  }
}