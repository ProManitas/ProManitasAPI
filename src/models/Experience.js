const {DataTypes} = require('sequelize')

module.exports = (database) =>{
    database.define('Experience', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,   
            allowNull: false
        }
    })
}