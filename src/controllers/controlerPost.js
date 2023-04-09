//IMPORTS
const { User, Services, Adpost, Rating } = require('../db');
const { createNew } = require('../services');

//---------------------CLODINARY SERVICES
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dhlvgmhea",
  api_key: "356675385545593",
  api_secret: "Qx7_iufQ__cmCBx9FY40JqVP1S4"
});



//-----------------------USERS-------------
//CREATE NEW USER
const signUp = async (req, res) => {
    const {username, service} = req.body;
    try {
        const userImage = 'userImage'
        const uploadImage = cloudinary.uploader.upload(req.body.image, {public_id: userImage})

            uploadImage.then((data) => {
                console.log(data);
                console.log(data.secure_url);
                }).catch((err) => {
                    console.log(err);
            });


            // Generate 
            const image = cloudinary.url(userImage, {
                width: 200,
                height: 200,
                Crop: 'fill'
            });
    
        const sign = await createNew('User', req)

        if(req.body.hasOwnProperty('role')){
            const userServiceRelation = await Services.findOne({where: {name : service}});
            await userServiceRelation.addUser(sign)
        }  
        res.status(201).send({
            message: `El usuario ${username} se ha creado correctamente`,
            data: await sign 
        })
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
    const { username, service} = req.body
    try {
        const adpost = await createNew('Adpost', req)
        
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
        res.status(400).send({message: 'Su anuncio no ha podido ser posteado', error: error.message});
    };
};


//---------------------------------------------------------------------

module.exports ={
    signUp,
    postServices,
    newAdpost,
}