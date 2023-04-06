//Importar los paquetes necesarios
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const expressJwt = require('express-jwt');
//Configurar los parámetros de Auth0
const authConfig = {
  domain: 'your-auth0-domain.auth0.com',
  audience: 'https://your-api.com'
};


//Función para verificar la firma del token
const verifyJwToken = () => {
  jwt({
 secret: jwt.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestPerMinute: 5,
  jwksUri: 'viene del front'
 }),
 audience:'https://promanitas-api.com',
 issuer: 'https://dev-ktrpfv6xelqmuqtt.us.auth0.com/',
 algorithms: ['RS256']
}).unless({path: ['/']})
}


module.exports={
  verifyJwToken
}