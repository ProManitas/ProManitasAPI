//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getAdposts } = require('../controllers/controlerGet');
const { newAdpost } = require('../controllers/controlerPost');

//-------------GET
//ALL ADPOSTS
router.get('/', (req, res) => {
    getAdposts(req, res);
});

//----------------POST
//CREATE NEW ADPOST
router.post('/', newAdpost);

module.exports = router;