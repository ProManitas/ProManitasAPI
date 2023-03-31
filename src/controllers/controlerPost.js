//IMPORTS
const { User, Services, Adpost, Rating } = require('../db');
const fakeDb = require('../MOCK_DATA_SERVICES.json')
const fakeDbUsers = require('../MOCK_DATA_USERS.json')

//CREATE NEW USER
const signUp = async (username, firstname, lastname, email, password, cellnumber, address, image) => {
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
        
        return sign;
    }   
     catch (error) {
        console.error(error);
        return {message: "El usuario no pudo ser creado"};
    };
};

const postServices = async (name) =>{
    try {

        const newService = await Services.create({name});
        return newService;

    } catch (error) {

        console.error(error);
        return {message: "El servicio no pudo ser creado"};
    };
};

//CREATE NEW POST
const newAdpost = async (name, description, /* service, username */) =>{
    try {
        const adpost = await Adpost.create({name, description});
        
        //SET USER ID AND SERVICE ID TO ADPOST 
        // const findIdService = await Services.findOne({where: {name : service}});
        // await adpost.addServices(findIdService);

        // const findIdUser = await User.findOne({where : {username : username}});
        // await User.addAdpost(findIdUser);

        // const userServiceRelation = await Services.findOne({where: {name : service}});
        // await User.addServices(userServiceRelation)

        return adpost;
    } catch (error) {
        console.error(error);
        return {message: 'Su anuncio no ha podido ser posteado'};
    };
};

    const filledDbServices = async () =>{
        fakeDb.map(e => Services.create({name : e.name}))
    }

    const filledDbUsers = async () =>{
        fakeDbUsers.map(e => User.create({
            username: e.username,
            firstname: e.firstname,
            lastname: e.lastname, 
               email: e.email,
            password: e.password,
          cellnumber: e.cellnumber,
            address: e.address,
            role: e.role,
            experience: e.experience,
            image: e.image,
            delete: e.delete
        }))
    }

module.exports ={
    signUp,
    postServices,
    newAdpost,
    filledDbServices,
    filledDbUsers
}