//IMPORTS
const { User, Services, Adpost, Rating } = require('../db');
const { sendEmail } = require('../nodemailer/nodemailer');
const { createNew, addImage } = require('../services');


//-----------------------USERS-------------
//CREATE NEW USER
const signUp = async (req, res) => {
    const {username, service, email} = req.body;
    try {
        
        const sign = await createNew('User', req)

        await addImage('User', req )

        if(req.body.hasOwnProperty('role')){
            const userServiceRelation = await Services.findOne({where: {name : service}});
            await userServiceRelation.addUser(sign)
        }  

        const html = `<h3>Bienvenido a Promanitas ${req.body.firstname}!</h3>
                <p>Gracias por suscribirte, nos complace el hecho de que seas parte de nuestra 
                comunidad y el habernos elegido como empresa. </p>
                <h4>Seguí explorando promanitas.</h4>
                <br></br>
                        <a href= "https://www.freecodecamp.org/"><button>Click aquí</button></a>`
                 
          const message = {
            from: 'promanitaspf@gmail.com', 
            to: email,
            subject: "Bienvenido a Promanitas!",
            text: "Gracias por Suscribirte a promanitas",
            html: html
        };
          
          sendEmail(message)

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
//CAMBIOS
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
    const {username, service, name} = req.body
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
        await userServiceRelation.addUser(findIdUser);

        await addImage('Adposts', req )
        
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

//---------------------------------CONTRACT
//CREATE NEW CONTRACT
const newContract = async (req, res) =>{
    const {username, email} = req.body
    try {
        const createContract = await createNew('Contract', req)

        const findUser = await User.findOne({where: {username : username}})
        await findUser.addContract(createContract)

        const html = `<h3>Hola ${req.body.firstname}!</h3>
        <p>Gracias nuevamente por confiar en nuestros servicios, es un honor para nosotros ayudar a nuestra comunidad Promanitas.</p>
        <h4>Para tener acceso a tu Key de contrato puedes hacer click.</h4>
        <br></br>
                <a href= "https://www.freecodecamp.org/"><button>Click aquí</button></a>`
         
        const message = {
        from: 'promanitaspf@gmail.com', 
        to: email,
        subject: "Bienvenido a Promanitas!",
        text: "Contrato realizado exitosamente",
        html: html
        };

        sendEmail(message)

        res.status(201).send({
            message: 'Su Contrato se ha realizado exitosamente',
            data: await createContract
        })
    } catch (error) {
        res.status(400).send({message : 'No se pudo crear el contrato', error: error.message})
    }
}

const rate = async (req, res) =>{
    const { id } = req.params
    const { username } = req.body 
    try {
        const newRate = await createNew('Rating', req)

        const findUser = await User.findOne({where: {username : username}})
        await findUser.addRating(newRate)
        
        const findAd = await Adpost.findByPk(id)
        await findAd.addRating(newRate)

        res.status(201).send({
            message: 'Se ha calificado correctamente',
            data: await newRate
        })
    } catch (error) {
        res.status(400).send({message: 'No se pudo proceder la calificación', error: error.message})
    }
}

//---------------------------------------------------------------------

module.exports ={
    signUp,
    postServices,
    newAdpost,
    newContract,
    rate
}
