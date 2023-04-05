//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getAdposts, getAdpostsId } = require('../controllers/controlerGet');
const { newAdpost } = require('../controllers/controlerPost');
const { updateAdpost } = require('../controllers/controlerPut');

//-------------GET
//ALL ADPOSTS
router.get('/', (req, res) => {
    getAdposts(req, res);
});

router.get('/:id', (req, res)=>{
    getAdpostsId(req, res)
})
//----------------POST
//CREATE NEW ADPOST
router.post('/', newAdpost);

router.put('/:id', (req, res)=>{
    updateAdpost(req, res)
})

module.exports = router;