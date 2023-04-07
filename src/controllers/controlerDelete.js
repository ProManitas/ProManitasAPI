const { User, Adpost } = require('../db');
const { filterID, deleteFromModel } = require('../services');


const deleteUser = async (req, res) =>{
    const { id } = req.params
    try {
        const response = await deleteFromModel(User, id)

        res.status(200).send({
            message: `El usuario ${id} se ha eliminado correctamente`,
            data : await response
        })
    } catch (error) {
        res.status(400).send({message: 'Ocurrió un error al eliminar el usuario', error: error.message})
    }
}

const deleteAdpost = async (req, res) =>{
    const { id } = req.params
    try {
        const response = await deleteFromModel(Adpost, id)

        res.status(200).send({
            message: `El usuario ${id} se ha eliminado correctamente`,
            data: await response
        })
        } catch (error) {
        res.status(400).send({
            message: `Ocurrió un error al eliminar el anuncio `, 
            error: error.message})
    }
}

//DELETE COMMENTS, DELETE RATING

module.exports={
    deleteUser,
    deleteAdpost
}