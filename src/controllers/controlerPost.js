const { User, Services, Adpost, Rating } = require('../db')

const signUp = async (username, firstname, lastname, email, password, cellnumber, address, image) =>{
    try {
        const sign = await User.create({
            username, 
            firstname, 
            lastname, 
            email, 
            password, 
            cellnumber, 
            address, 
            image
        });
        return sign 
    }   
     catch (error) {
        console.error(error)
        return {message: "El usuario no pudo ser creado"}
    }
}

const postServices = async (name) =>{
    try {
        const newService = await Services.create({name})
        return newService
    } catch (error) {
        console.error(error)
        return {message: "El servicio no pudo ser creado"}
    }
}

const newAdpost = async (name, description) =>{
    try {
        const adpost = await Adpost.create({name, description})
        return adpost
    } catch (error) {
        console.error(error);
        return {message: 'Su anuncio no ha podido ser posteado'}
    }
}

module.exports ={
    signUp,
    postServices,
    newAdpost,
}