//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getServices, getServiceId } = require('../controllers/controlerGet');
const { postServices } = require('../controllers/controlerPost');


//----------------GET
//ALL SERVICES
router.get('/', getServices);

//SERVICE BY ID
router.get('/:id', getServiceId);

//---------------POST
//CREATE NEW SERVICE
router.post('/', postServices);


module.exports = router