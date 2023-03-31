//IMPORTS
const { Router } = require('express');
const router = Router();
//ROUTES
const user = require('./users.js');
const services = require('./services.js');
const adposts = require('./adposts.js');

//USERS ROUTE
router.use('/api/v1/users', (req, res)  => {
    user(req, res);
});

//SERVICES ROUTE
router.use('/api/v1/services', (req, res) => {
    services(req, res);
});

//ADPOSTS ROUTE
router.use('/api/v1/adposts', (req, res) => {
    adposts(req, res);
});

module.exports = router;