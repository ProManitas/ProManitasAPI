const { sequelize, Op } = require('sequelize');
const { User } = require('../db');

module.exports={
    updateUser:async(req,res)=>{
        const {id} = req.params;
        try {
            const userFilter = await User.findByPk(id);
        
            if (!userFilter) {
              return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            const updatedProduct = await userFilter.update(req.body);
        
            res.status(200).json(updatedProduct);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al actualizar el usuario' });
          }
        }
    }


}
