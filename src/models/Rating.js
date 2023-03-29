const {DataTypes} = require('sequelize')

module.exports = (database) =>{
    database.define('Rating', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,   
            allowNull: false
        }
    })
}