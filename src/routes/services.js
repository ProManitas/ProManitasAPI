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
router.post('/', postServices);


module.exports = router