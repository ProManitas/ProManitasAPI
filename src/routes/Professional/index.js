const { Router } = require('express');
const DB = require('../../MOCK_DATA_PRO.json');
const { validationID } = require('../../middleware/index.js');
const router = Router();

//GET ROUTES -------------------------------
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'All DB',
        data: DB
    });
});

router.get('/:id' , validationID(), (req, res) => {
    
    const { id } = req.params
    res.status(200).send({
        message: 'Professional ' + id,
        data: DB.filter(e => e.id === id * 1)
    });
});
//-------------------------------

module.exports = router;