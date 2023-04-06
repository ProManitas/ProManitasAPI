//Importar los paquetes necesarios
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://promanitas-api.com',
  issuerBaseURL: 'https://dev-ktrpfv6xelqmuqtt.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});



//Función para verificar la firma del token
// const verifyJwToken = () => {
//   jwt({
//  secret: jwt.expressJwtSecret({
//   cache: true,
//   rateLimit: true,
//   jwksRequestPerMinute: 5,
//   jwksUri: 'viene del front'
//  }),
//  audience:'https://promanitas-api.com',
//  issuer: 'https://dev-ktrpfv6xelqmuqtt.us.auth0.com/',
//  algorithms: ['RS256']
// }).unless({path: ['/']})
// }


module.exports={
  verifyJwToken
}