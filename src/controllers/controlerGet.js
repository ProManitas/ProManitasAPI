//IMPORTS
const { sequelize, Op } = require('sequelize');
const { Adpost, Rating, Services, User } = require('../db');

module.exports = {
  //ALL CLIENTS DB
  getClients: async () => {
    try {
      const response = await User.findAll()
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
};
