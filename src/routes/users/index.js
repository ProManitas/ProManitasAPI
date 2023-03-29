//IMPORTS
const { Router } = require('express');
const router = Router();
//DB MOCK
const DB = require('../../MOCK_DATA_USERS.json');
//CONTROLLERS
const { getClients } = require('../../controllers/controlerGet');
//MIDDLEWARES
const { validationID } = require('../../middleware/index.js');

//ALL CLIENTS DB
router.get('/', async (req, res) => {
    res.status(200).send({
        message: 'All Users',
        data: [... await getClients() , ... DB]
    });
});

//CLIENT FOR ID
router.get('/:id', validationID(), async (req, res) => {
    const { id } = req.params

    res.status(200).send({
        message: 'User ' + id,
        data: DB.filter(e => e.id == id )
    });
});


module.exports = router;