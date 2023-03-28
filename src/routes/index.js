//IMPORTS
const { Router } = require('express');
const router = Router();
//ROUTES
const providers = require('./Professional/index.js');
const customer = require('./users/index.js');

//PROVIDERS ROUTE
router.use('/api/v1/providers', (req, res)  => {
    providers(req, res);
});

//USERS ROUTE
router.use('/api/v1/users', (req, res)  => {
    customer(req, res);
});

module.exports = router;