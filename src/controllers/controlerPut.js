const { sequelize, Op } = require('sequelize');
const { User, Adpost } = require('../db');

updateUser = async(req,res)=> {
    const {id} = req.params;
    const { username, firstname, lastname, email, password, cellnumber, address, image } = req.body;
    try {
        const userFilter = await User.findByPk(id);
    
        if (!userFilter) {
          res.status(404).json({ error: `Usuario no encontrado` });
          return;
        };
        
        const updatedUser = await userFilter.update({ username, firstname, lastname, email, password, cellnumber, address, image });
    
        res.status(200).send({
          message: `El usuario ${username} ha sido actualizado correctamente`,
          data: updatedUser});
      } catch (err) {
        console.error(err);
        res.status(500).send({ 
          message: 'Error al actualizar el usuario',
          error : err.message
         });
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



