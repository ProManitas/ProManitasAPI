const { User, Adpost, Contract, Rating } = require('../db');
const { filterID, deleteFromModel } = require('../services');

//DELETE USER
const deleteUser = async (req, res) =>{
    const { id } = req.params
    try {

        res.status(200).send({
            message: `El usuario ${id} se ha eliminado correctamente`,
            data : await deleteFromModel(User, id)
        })
    } catch (error) {
        res.status(400).send({message: 'Ocurrió un error al eliminar el usuario', error: error.message})
    }
}

//DELETE ADPOST
const deleteAdpost = async (req, res) =>{
    const { id } = req.params
    try {

        res.status(200).send({
            message: `El usuario ${id} se ha eliminado correctamente`,
            data: await deleteFromModel(Adpost, id)
        })
        } catch (error) {
        res.status(400).send({
            message: `Ocurrió un error al eliminar el anuncio `, 
            error: error.message})
    }
}

//DELETE CONTRACT
const deleteContract = async (req, res) =>{
    const { id } = req.params
    try {

        res.status(200).send({
            message: 'Se ha borrado correctamente el contrato',
            data: await deleteFromModel(Contract, id)
        })
    } catch (error) {
        res.status(400).send({
            message: 'Ha ocurrido un error al eliminar el contrato', error: error.message
        })
    }
}

//DELETE RATING
const deleteRating = async (req, res) =>{
    const { id } = req.params
    try {

        res.status(200).send({
            message: 'Se ha borrado correctamente la calificación',
            data: await deleteFromModel(Rating, id)
        })
        
    } catch (error) {
        res.status(400).send({
            message: 'Ha ocurrido un error al eliminar la calificación', error: error.message})
    }
}

//DELETE COMMENTS

module.exports={
    deleteUser,
    deleteAdpost,
    deleteContract,
    deleteRating
}