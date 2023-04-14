//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getUsers, getUserId, deletedUsers } = require('../controllers/controlerGet');
const {signUp} = require('../controllers/controlerPost')
const {updateUser} = require('../controllers/controlerPut')
//MIDDLEWARES
const { validationID, validatorSignIn } = require('../middleware/index.js');
const { deleteUser } = require('../controllers/controlerDelete');

//--------------- GET
router.get('/', (req, res) => {
    getUsers(req, res)
});

router.get('/deleted', (req, res)=>{
    deletedUsers(req, res)
})

//USER FOR ID
router.get('/:id', validationID(), (req, res) => {
   getUserId(req, res);
});

//------------------------POST
//FORM TO SIGN-IN
router.post('/', signUp)

//-----------------------PUT
router.put('/:id', (req, res) => {
    updateUser(req, res);
});

//-----------------------DELETE
router.delete('/:id', (req, res) => {
    deleteUser(req, res);
});

module.exports = router;
