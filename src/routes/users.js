//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsers, getUserId, getUsersWithRole, getUsersWithoutRole } = require('../controllers/controlerGet');
const {signUp} = require('../controllers/controlerPost')
const {updateUser} = require('../controllers/controlerPut')
//MIDDLEWARES
const { validationID, validatorSignIn } = require('../middleware/index.js');

//--------------- GET
router.get('/', async (req, res) => {

    //USER WITH ROLE && WITHOUT ROLE
    if(req.query.hasOwnProperty('role')){

        const { role } = req.query

        if( role == 'true' ){

            res.status(200).send({
                message: 'User with Role',
                data: await getUsersWithRole()
            });
            return;
        };

        if( role == 'false' ){
            res.status(200).send({
                message: 'User without Role',
                data: await getUsersWithoutRole()
            });
            return;
        };
    };
    
    //ALL USERS
    res.status(200).send({
        message: 'All Users',
        data: await getUsers()
    });
});

//USER FOR ID
router.get('/:id', validationID(), );

//------------------------POST
//FORM TO SIGN-IN
router.post('/signUp', validatorSignIn(), signUp);
//-----------------------PUT
router.put('/:id', updateUser);

module.exports = router;