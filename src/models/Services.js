const { DataTypes } = require('sequelize');

module.exports = (database) =>{
    database.define('Services', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        timestamps: false
    })
}