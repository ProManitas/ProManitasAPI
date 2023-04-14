const { DataTypes } = require ('sequelize')

module.exports = (database) =>{
    database.define('Contract', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        commencementDate:{
            type: DataTypes.DATE,
            allowNull: false
        },
        terminationDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(new Date().getFullYear() + 1, 0, 1) // Establece el primer día del año siguiente como valor por defecto
        },
        payment:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        details:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        }

    })
}