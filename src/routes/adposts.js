//IMPORTS
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { getAdposts, getAdpostsId, deletedAdposts } = require('../controllers/controlerGet');
const { newAdpost } = require('../controllers/controlerPost');
const { updateAdpost } = require('../controllers/controlerPut');
const { deleteAdpost } = require('../controllers/controlerDelete');

//-------------GET
//ALL ADPOSTS
router.get('/', (req, res) => {
    getAdposts(req, res);
});


router.get('/deleted', (req, res)=>{
    deletedAdposts(req, res)
})

router.get('/:id', (req, res)=>{
    getAdpostsId(req, res)
})
//----------------POST
//CREATE NEW ADPOST
router.post('/', newAdpost);

//----------------PUT
router.put('/:id', (req, res)=>{
    updateAdpost(req, res)
})

//-----------------DELETE
router.delete('/:id', (req, res) => {
    deleteAdpost(req, res);
});

module.exports = router;