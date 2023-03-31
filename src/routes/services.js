//IMPORTS
const { Router } = require('express');
const router = Router();
const DB = require('../MOCK_DATA_SERVICES.json')
//CONTROLLERS
const { getServices, getServiceId } = require('../controllers/controlerGet');
const { postServices, newAdpost } = require('../controllers/controlerPost');


//----------------GET
router.get('/', async (req, res) => {
    res.status(200).send({
        message: 'All Services',
        data: [...await getServices(), ...DB]
        data: await getServices() || 'Esto es servicios'
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.status(200).send({
        message: `Service id: ${id}`,
        data:[...await getServiceId(id), ...DB.filter(e => e.id == id )]
    });
});

router.post('/', async (req, res) =>{
    const { name } = req.body
    res.status(201).send({
        message: 'Service name: ' + name,
        data: await postServices(name)
    })
})

router.post('/adpost', async (req, res) =>{
    const { name, description } = req.body
    res.status(201).send({
        message: 'Su anuncio se ha posteado correctamente',
        data: newAdpost(name, description)
        data: await getServiceId() || 'Esto es servicios por ID'
    });
});

//---------------POST
router.post('/', async (req, res) =>{
    const { name } = req.body
    res.status(201).send({
        message: 'El servicio ' + name + ' se ha creado exitosamente',
        data: await postServices()
    })
})

module.exports = router