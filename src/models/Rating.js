const {DataTypes} = require('sequelize')

module.exports = (database) =>{
    database.define('Rating', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}