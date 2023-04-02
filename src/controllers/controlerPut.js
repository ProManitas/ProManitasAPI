const { sequelize, Op } = require('sequelize');
const { User } = require('../db');

updateUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const userFilter = await User.findByPk(id);
    
        if (!userFilter) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        const updatedProduct = await userFilter.update(req.body);
    
        res.status(200).send({
          message: `El usuario ${username} ha sido actualizado correctamente`,
          data: updatedProduct});
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al actualizar el usuario' });
      }
    }
    
module.exports={ updateUser}



