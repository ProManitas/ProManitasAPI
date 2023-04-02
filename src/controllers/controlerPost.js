//IMPORTS
const { User, Services, Adpost, Rating } = require('../db');
const fakeDb = require('../MOCK_DATA_SERVICES.json')
const fakeDbUsers = require('../MOCK_DATA_USERS.json')
const fakeDbAdpost = require('../MOCK_DATA_ADPOST.json')

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

//CREATE NEW SERVICE
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
const newAdpost = async (name, description,  username, service) =>{
    try {
        const adpost = await Adpost.create({name, description});
        
        //RELATION USER AND ADPOST
        const findIdUser = await User.findOne({where : {username : username}});
        await findIdUser.addAdpost(adpost);

        //RELATION SERVICE AND ADPOST
        const findIdService = await Services.findOne({where: {name : service}});
        await findIdService.addAdpost(adpost);

        //RELATION USER AND SERVICE
        const userServiceRelation = await Services.findOne({where: {name : service}});
        await userServiceRelation.addUser(findIdUser)

        return adpost;
    } catch (error) {
        console.error(error);
        return {message: 'Su anuncio no ha podido ser posteado'};
    };
};

//------------------------MOCK DATA----------------------------------
    const filledDbServices = async () =>{
        fakeDb.map(e => Services.create({name : e.name}));
    };

    const filledDbAdpost = async () =>{
        fakeDbAdpost.map(post => Adpost.create({name : post.name, description: post.description}));
    };

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
        }));
    };

//---------------------------------------------------------------------

module.exports ={
    signUp,
    postServices,
    newAdpost,
    filledDbServices,
    filledDbUsers,
    filledDbAdpost
}