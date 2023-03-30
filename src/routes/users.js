//IMPORTS
const { Router } = require('express');
const router = Router();
//DB MOCK
const DB = require('../MOCK_DATA_USERS.json');
//CONTROLLERS
const { getUsers, getUserId, getUsersWithRole, getUsersWithoutRole } = require('../controllers/controlerGet');
//MIDDLEWARES
const { validationID } = require('../middleware/index.js');

//USER DB
router.get('/', async (req, res) => {

    //USER WITH ROLE && WITHOUT ROLE
    if(req.query.hasOwnProperty('role')){

        const { role } = req.query

        if( role == 'true' ){
            console.log(req.query);

            res.status(200).send({
                message: 'User with Role',
                data: [...await getUsersWithRole(), ...DB.filter(e => e.role == true )]
            });
            return;
        };

        if( role == 'false' ){
            res.status(200).send({
                message: 'User without Role',
                data: [... await getUsersWithoutRole()  , ...DB.filter(e => e.role == false )]
            });
            return;
        };
    };
    
    res.status(200).send({
        message: 'All Users',
        data: [... await getUsers() , ...DB]
    });
});

//USER FOR ID
router.get('/:id', validationID(), async (req, res) => {
    const { id } = req.params

    res.status(200).send({
        message: 'User ' + id,
        data: getUserId() || DB.filter(e => e.id == id )
    });
});

module.exports = router;