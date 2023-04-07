//IMPORTS
const { Router } = require('express');
const router = Router();
//ROUTES
const user = require('./users.js');
const services = require('./services.js');
const adposts = require('./adposts.js');
const login = require('./login.js');
const payment = require('./payment.js')

// router.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
//   });
  
//   // Manejador de errores
//   router.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({
//       error: {
//         message: err.message,
//         error : 'Invalid route'
//       }
//     });
//   });

router.get('/', (req, res) => {
    res.status(200).send('<html><body style="font-family: sans-serif" ><h1>ProManitas REST API</h1><div>LINKS</div></br><div><a href="https://promanitasapi.onrender.com/api/v1/users">Users</a></div><div><a href="https://promanitasapi.onrender.com/api/v1/services">Services</a></div><div><a href="https://promanitasapi.onrender.com/api/v1/adposts">Adposts</a></div></body></html>')
});

//LOGIN && SIGNIN ROUTE
router.use('/api/v1/login', (req, res) => {
    login(req, res)
})

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

//PAYMENT GATEWAY ROUTE
router.use('/api/v1/checkout', (req, res)=>{
    payment(req, res);
})

module.exports = router;