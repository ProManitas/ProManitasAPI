const { DataTypes } = require('sequelize');

module.exports = (database) =>{
    database.define('services', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}