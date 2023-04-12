//IMPORTS
const { User, Services, Adpost, Rating } = require('../db');
const { createNew, addImage } = require('../services');


//-----------------------USERS-------------
//CREATE NEW USER
const signUp = async (req, res) => {
    const {username, service} = req.body;
    try {
        
        const sign = await createNew('User', req)

        await addImage('User', req, username)

        if(req.body.hasOwnProperty('role')){
            const userServiceRelation = await Services.findOne({where: {name : service}});
            await userServiceRelation.addUser(sign)
        }  
        res.status(201).send({
            message: `El usuario ${username} se ha creado correctamente`,
            data: await User.findOne({ 
                where: { username },
                attributes: ['id','username', 'firstname', 'lastname', 'email', 'password', 'cellnumber', 'address', 'image', 'experience', 'role'] })
        });
    }   
     catch (error) {
        console.error(error);
        res.status(400).send({message: "El usuario no pudo ser creado", error: error.message});
    };
};

//---------------------------------SERVICES
//CREATE NEW SERVICE
const postServices = async (req, res) =>{
    try {

        res.status(201).send({
            message: `El servicio se ha creado exitosamente`,
            data: await createNew('Services', req)
        });
    } catch (error) {
        console.error(error);
         res.status(400).send({message: "El servicio no pudo ser creado", error: error.message});
    };
};

//------------------------------------------ADPOSTS
//CREATE NEW POST
const newAdpost = async (req, res) =>{
    const { service, name} = req.body
    try {
        const adpost = await createNew('Adpost', req)
        await addImage('Adposts', req )
        
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
            data: await Adpost.findOne({ 
                where: { name },
                attributes: ["id","name", "description","image", "UserId", "ServiceId"]})
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Su anuncio no ha podido ser posteado', error: error.message});
    };
};


//---------------------------------------------------------------------

module.exports ={
    signUp,
    postServices,
    newAdpost,
}
