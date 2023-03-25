const { DataTypes } = require('sequelize')

module.exports = (database) =>{
    database.define( "Clients", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement : true
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
        adress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        is_provider:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        delete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        } // LOS DEL FRONT TIENEN QUE ENCARGARSE DE QUE SEAN MAYORES DE EDAD; 
    })
}

