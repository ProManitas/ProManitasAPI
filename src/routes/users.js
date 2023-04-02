//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsers, getUserId, getUsersWithRole, getUsersWithoutRole } = require('../controllers/controlerGet');
const {signUp} = require('../controllers/controlerPost')
const controlerPut = require('../controllers/controlerPut')
//MIDDLEWARES
const { validationID, validatorSignIn } = require('../middleware/index.js');

//--------------- GET
router.get('/', async (req, res) => {

    //USER WITH ROLE && WITHOUT ROLE
    if(req.query.hasOwnProperty('role')){

        const { role } = req.query

        if( role == 'true' ){
            console.log(req.query);

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
router.get('/:id', validationID(), async (req, res) => {
    const { id } = req.params

    res.status(200).send({
        message: 'User ' + id,
        data: await getUserId(id)
    }); 
});

//------------------------POST
//FORM TO SIGN-IN
router.post('/signUp', validatorSignIn(), async (req, res) => {

    const {username, firstname, lastname, email, password, cellnumber, address, image} = req.body;
    const signing = await signUp(username, firstname, lastname, email, password, cellnumber, address, image);

    res.status(201).send({
        message: 'User ' + username + ' has been created successfully',
        data: signing
    });
});
//-----------------------PUT
router.put('/:id', controlerPut.updateUser);

module.exports = router;