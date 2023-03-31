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
router.post('/', async (req, res) =>{
    const { name, description, /* service, username */ } = req.body
    res.status(201).send({
        message: 'Su anuncio se ha posteado correctamente',
        data: await newAdpost(name, description, /* service, username */)
    });
});

module.exports = router;