const { User, Adpost } = require('../db');
const { updateModel } = require('../services');

updateUser = async(req,res)=> {
    const {id} = req.params;
    try {       
        const updatedUser = await updateModel(User, id, req);
    
        res.status(200).send({
          message: `El usuario ha sido actualizado correctamente`,
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
  try {
    const updatePost = await updateModel(Adpost, id, req)

    res.status(200).send({
      message: 'Se ha actualizado tu post correctamente', 
      data: await updatePost
    })

  } catch (error) {
    res.status(400).send({message: 'Su post no ha podido ser actualizado', error: error.message})
  }
}
    
module.exports={ updateUser, updateAdpost }



