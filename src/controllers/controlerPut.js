const { User, Adpost, Contract } = require('../db');
const { updateModel } = require('../services');

const updateUser = async(req,res)=> {
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

const updateContract = async (req, res) =>{
  const {id} = req.params
  try {
    const update = await updateModel(Contract, id, req)

    res.status(200).send({
      message: 'Se ha actualizado correctamente el contrato',
      data: await update
    })
  } catch (error) {
    res.status(400).send({message: 'El contrato no ha podido ser acualizado'})
  }
}
    
module.exports={ updateUser, updateAdpost, updateContract }



