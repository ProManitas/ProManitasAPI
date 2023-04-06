const { User, Adpost } = require('../db');
const { filterID } = require('../services');


const deleteUser = async (req, res) =>{
    const { id } = req.params
    const {deleted} = req.body
    try {
        const find = await filterID('User', id)
        if(!find){
            res.status(400).send({message: `El usuario con ID: ${id} no existe`})
            return
        }

        const response = await User.update({deleted}, {where : {id : id}})

        res.status(200).send({
            message: `El usuario ${id} se ha eliminado correctamente`,
            data : await find
        })
    } catch (error) {
        res.status(400).send({message: 'Ocurrió un error al eliminar el usuario', error: error.message})
    }
}

const deleteAdpost = async (req, res) =>{
    const { id } = req.params
    const {deleted} = req.body
    try {
        const findPost = await filterID('Adpost', id)
        if(!findPost){
            res.status(400).send({message: `El anuncio con ID: ${id} no existe`})
            return
        }
        const response = await Adpost.update({deleted}, {where: {id: id}})

        res.status(200).send({
            message: `El usuario ${id} se ha eliminado correctamente`,
            data: await findPost
        })
        } catch (error) {
        res.status(400).send({message: `Ocurrió un error al eliminar el anuncio `, error: error.message})
    }
}

//DELETE COMMENTS, DELETE RATING

module.exports={
    deleteUser,
    deleteAdpost
}
