const { sequelize, Op } = require('sequelize');
const { User, Adpost } = require('../db');
const { filterID, allInf } = require('../services');

const updateUser = async(req,res)=> {
    const {id} = req.params;
    const {username, firstname, lastname, email, password, cellnumber, address, image} = req.body;
    try {
      // const findAdpost = await Adpost.findByPk(id)
        const userFilter = await filterID('User', id);
    
        if (!userFilter) {
          res.status(404).json({ error: `Usuario no encontrado` });
          return;
        };
        
        const updatedUser = await User.update({username, firstname, lastname, email, password, cellnumber, address, image}, {where: {id: id}});
    
        res.status(200).send({
          message: `El usuario ${username} ha sido actualizado correctamente`,
          data: await updatedUser
        });
      } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el usuario', error: error.message });
      };
};

const updateAdpost = async (req, res) =>{
  const {id} = req.params
  const {name, description} = req.body
  try {
    const findAdpost = await Adpost.findByPk(id)
    
    if (!findAdpost) {
      res.status(404).json({ error: `Adpost no encontrado` });
      return;
    };

    const updatePost = await findAdpost.update({name, description})

    res.status(200).send({
      message: 'Se ha actualizado tu post correctamente', 
      data: await updatePost
    })

  } catch (error) {
    res.status(400).send({message: 'Su post no ha podido ser actualizado', error})
  }
}
    
module.exports={ updateUser, updateAdpost }



