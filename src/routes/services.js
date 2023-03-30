//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getServices, getServiceId } = require('../controllers/controlerGet');


//SERVICES DB
router.get('/', async (req, res) => {
    res.status(200).send({
        message: 'All Services',
        data: await getServices()
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.status(200).send({
        message: `Service id: ${id}`,
        data: await getServiceId()
    });
});