const { Router } = require('express');
const router = Router();
const DB = require('../../MOCK_DATA_USERS.json');

router.get('/', (req, res) => {

    res.status(200).send({
        message: 'All Users',
        data: DB
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params

    res.status(200).send({
        message: 'User ' + id,
        data: DB.filter(e => e.id === id * 1)
    });
});

//Este es un test
//PUT

module.exports = router;