//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getServices, getServiceId } = require('../controllers/controlerGet');
const { postServices } = require('../controllers/controlerPost');


//----------------GET
//ALL SERVICES
router.get('/', async (req, res) => {
    res.status(200).send({
        message: 'All Services',
        data: await getServices()
    }); 
});

//SERVICE BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.status(200).send({
        message: `Services id: ${id}`,
        data: await getServiceId(id)
    });
});

//---------------POST
//CREATE NEW SERVICE
router.post('/', async (req, res) =>{
    const { name } = req.body
    res.status(201).send({
        message: 'El servicio ' + name + ' se ha creado exitosamente',
        data: await postServices(name)
    });
});


module.exports = router