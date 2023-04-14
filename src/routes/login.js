//Importar los paquetes necesarios
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const expressJwt = require('express-jwt');
const { login } = require('../services/index');


const router = Router();
// const { verifyToken } = require('../services/index')
// const { loginUser } = require('../controllers/controlerPost')

//Configurar los parámetros de Auth0
const authConfig = {
    domain: process.env.DOMAIN,
    audience: process.env.AUDIENCE
  };
  
  //Crear un cliente para la conexión con Auth0
  const client = jwksRsa({
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  });
  
  //Función para verificar la firma del token
  function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    const signingKey = (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        callback(null, key.publicKey || key.rsaPublicKey);
      });
    };
    expressJwt({
      secret: signingKey,
      algorithms: ['RS256'],
      audience: authConfig.audience,
      issuer: `https://${authConfig.domain}/`
    })(req, res, next);
  };
  
  //Función para crear un token de acceso
  function createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
  };
  
  //Ruta para la autenticación
  router.post('/', async (req, res) => {
    const user = { email: req.body.email, password: req.body.password };
    
    const customer = await login(user.email, user.password)
    
    
    //Verificar las credenciales del usuario y crear un token de acceso
    if (customer !== null) {
      const accessToken = createAccessToken(user);
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
  
  //Ruta protegida que requiere autenticación
  router.get('/', verifyToken, (req, res) => {
    const user = { email: 'user@example.com' };
    res.json(user);
  });



module.exports = router