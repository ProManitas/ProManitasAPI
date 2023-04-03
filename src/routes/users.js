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
router.get('/', (req, res) => {
    getUsers(req, res)
});

//USER FOR ID
router.get('/:id', validationID(), (req, res) => {
   getUserId(req, res)
});

//------------------------POST
//FORM TO SIGN-IN
router.post('/signUp', validatorSignIn(), (req, res) => {
    signUp(req, res)
});

//-----------------------PUT
router.put('/:id', (req, res) => {
    updateUser(req, res)
});

module.exports = router;