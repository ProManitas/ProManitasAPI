const { DataTypes } = require('sequelize')

module.exports = (database) =>{
    database.define( "User", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cellnumber:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        experience:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        delete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }  
    })
}

