//IMPORTS
const { Router } = require('express');
const router = Router();
//ROUTES
const user = require('./users/index.js');

//USERS ROUTE
router.use('/api/v1/user', (req, res)  => {
    user(req, res);
});

module.exports = router;