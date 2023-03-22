//IMPORTS
const { Router } = require('express');
const professionals = require('./Professional/index.js');
const customer = require('./users/index.js');

const router = Router();

router.use('/api/v1/pro', (req, res)  => {
    professionals(req, res);
});

router.use('/api/v1/users', (req, res)  => {
    customer(req, res);
});

module.exports = router;