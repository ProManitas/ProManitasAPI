//IMPORTS
const { Router } = require('express');
const router = Router();
//DB MOCK
const DB = require('../../MOCK_DATA_USERS.json');
//CONTROLLERS
const { getUsers } = require('../../controllers/controlerGet');
const {signUp} = require('../../controllers/controlerPost')
//MIDDLEWARES
const { validationID } = require('../../middleware/index.js');

//ALL CLIENTS DB
router.get('/', async (req, res) => {
    res.status(200).send({
        message: 'All Users',
        data: [... await getUsers() , ... DB]
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

//FALTA MIDDLEWARE DE VALIDACION
router.post('/signUp', async (req, res) => {
    const {username, firstname, lastname, email, password, cellnumber, address, image} = req.body
        const signing = await signUp(username, firstname, lastname, email, password, cellnumber, address, image)
        res.status(201).send({
            message: 'User ' + username + ' has been created succesfully',
            data: signing
        })
    }
)

module.exports = router;