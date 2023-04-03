//IMPORTS
const { User, Services, Adpost, Rating } = require('../db');

//-----------------------USERS-------------
//CREATE NEW USER
const signUp = async (req, res) => {
    const {username, firstname, lastname, email, password, cellnumber, address, image, service, role} = req.body;
    try {
        const sign = await User.create({
            username, 
            firstname, 
            lastname, 
            email, 
            password,  //NO OLVIDAR SI HAY QUE COLOCAR EXPERIENCIA O NO
            cellnumber, 
            address, 
            image,
            role
        });
        if(req.body.hasOwnProperty('role')){
            const userServiceRelation = await Services.findOne({where: {name : service}});
            await userServiceRelation.addUser(sign)
        }  
        res.status(201).send({
            message: `El usuario ${username} se ha creado correctamente`,
            data: await sign })
    }   
     catch (error) {
        console.error(error);
        res.status(400).send({message: "El usuario no pudo ser creado"});
    };
};

//---------------------------------SERVICES
//CREATE NEW SERVICE
const postServices = async (req, res) =>{
    const { name } = req.body
    try {
        const newService = await Services.create({name});
        res.status(201).send({
            message: `El servicio ${name} se ha creado exitosamente`,
            data: await newService
        });
    } catch (error) {
        console.error(error);
         res.status(400).send({message: "El servicio no pudo ser creado"});
    };
};

//------------------------------------------ADPOSTS
//CREATE NEW POST
const newAdpost = async (req, res) =>{
    const { name, description, username, service} = req.body
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

        res.status(201).send({
            message: 'Su anuncio se ha posteado correctamente',
            data: await adpost
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Su anuncio no ha podido ser posteado'});
    };
};


//---------------------------------------------------------------------

module.exports ={
    signUp,
    postServices,
    newAdpost,
}