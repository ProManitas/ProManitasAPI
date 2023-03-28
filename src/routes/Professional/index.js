//IMPORTS
const { Router } = require('express');
const router = Router();
//DB MOCK
const DB = require('../../MOCK_DATA_PRO.json');
//CONTROLLERS
const { getProviders } = require('../../controllers/controlerGet');
//MIDDLEWARES
const { validationID } = require('../../middleware/index.js');

//ALL PROVIDERS DB
router.get('/', async (req, res) => {
    res.status(200).send({
        message: 'All DB',
        data: await getProviders() || DB
    });
});

//PROVIDER FOR ID
router.get('/:id' , validationID(), async (req, res) => {
    
    const { id } = req.params
    res.status(200).send({
        message: 'Professional ' + id,
        data: await getProviders().filter(e => e.id === id * 1) 
    });
});

module.exports = router;