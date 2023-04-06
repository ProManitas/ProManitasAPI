//IMPORTS 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { verifyJwToken } = require('./login/login');


const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

//SE NECESITAN GET DE RUTAS PROTEGIDAS DEL FRONT
// server.use(verifyJwToken)

// server.get('/protected', async(req, res)=>{
//   try {
//     const accesToken = req.headers.authorization.split(' ')[1];
//     const response = await axios.get('misma url issuer con otra ruta con la info del usuario', {
//       headers:{
//         authorization: `viene del front ${accesToken}`
//       }
//     })
//     const userInfo = response.data
//     console.log(userInfo);
//   } catch (error) {
//     res.send(error)
//   }
// })

// enforce on all endpoints
app.use(jwtCheck);

//SE NECESITAN GET DE RUTAS PROTEGIDAS DEL FRONT
app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});


server.use((err, req, res, next)=>{
  const status = err.status || 500
  const message = err.message || 'Error interno en el servidor'
})

server.use('/', router)

module.exports = server;
