const { sequelize, Op } = require('sequelize');
const { Clients, Experience, Providers } = require('../db');

module.exports = {
  getClients: async () => {
    try {
      const response = await Clients.findAll()
      const clientsList = response.map(client => {
        if (!client.deletedAt && !client.provider) {
          return {
            id: client.id,
            firstName: client.firstname,
            lastName: client.lastname,
            email: client.email,
            cellNumber: client.cellnumber,
            address: client.address,
            isProvider: client.is_provider,
          };
        }
      });
      return clientsList.filter(client => client)
    } catch (error) {
      console.error(error)
      return error
    }
  },
  getProviders: async()=>{
    try {
        const response = await Clients.findAll({
            include : Providers
        })
        const clientsList = response.map(client => {
          if (!client.deletedAt && client.is_provider) {
            return {
              id: client.id,
              firstName: client.firstname,
              lastName: client.lastname,
              email: client.email,
              cellNumber: client.cellnumber,
              address: client.address,
              rating : client.rating,
              job : client.job,
            }
          }
        })
        return clientsList.filter(client => client)
      } catch (error) {
        console.error(error)
        return error
      }
  }
};
