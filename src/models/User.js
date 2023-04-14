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
            allowNull: false,
            defaultValue: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false
        },
        //SE CAMBIO CELLNUMBER A STRING PARA QUE ACEPTARA LOS DATOS DE LA API MOCKEADA YA QUE LOS CELLNUMBER TIENEN GUIONES
        cellnumber:{
            type: DataTypes.STRING,
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
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }  
    })
}

