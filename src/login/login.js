//Importar los paquetes necesarios
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const expressJwt = require('express-jwt');

//Configurar los parámetros de Auth0
const authConfig = {
  domain: 'your-auth0-domain.auth0.com',
  audience: 'https://your-api.com'
};

//Crear un cliente para la conexión con Auth0
const client = jwksRsa({
  jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
});

//Función para verificar la firma del token
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
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
}

//Función para crear un token de acceso
function createAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

//Ruta para la autenticación
app.post('/api/login', (req, res) => {
  const user = { email: req.body.email, password: req.body.password };
  //Verificar las credenciales del usuario y crear un token de acceso
  if (user.email === 'user@example.com' && user.password === 'password') {
    const accessToken = createAccessToken(user);
    res.json({ accessToken: accessToken });
  } else {
    res.status(401).send('Invalid username or password');
  }
});

//Ruta protegida que requiere autenticación
app.get('/api/user', verifyToken, (req, res) => {
  const user = { email: 'user@example.com' };
  res.json(user);
});