const { DataTypes } = require ('sequelize')

module.exports = (database) =>{
    database.define('Contract', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        commencement_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        termination_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        payment:{
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