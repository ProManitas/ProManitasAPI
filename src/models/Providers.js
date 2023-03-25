const { DataTypes } = require('sequelize');

module.exports = (database) =>{
    database.define('Providers', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            autoIncrement: true
        },
        rating:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        job:{
            type: DataTypes.STRING,
            allowNull: false
        },
        experience:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}