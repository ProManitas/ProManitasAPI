//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getAdposts } = require('../controllers/controlerGet');
const { newAdpost } = require('../controllers/controlerPost');

//-------------GET
//ALL ADPOSTS
router.get('/', async (req , res) => {
    res.status(200).send({
        mesagge: 'All Adposts',
        data: await getAdposts()
    });
});

//----------------POST
//CREATE NEW ADPOST
router.post('/', newAdpost);

module.exports = router;