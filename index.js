require('dotenv').config();
const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const PORT = process.env.PORT || 8080;

// Crear un nuevo proxy server
const proxy = httpProxy.createProxyServer({});

// Cargar las direcciones de las máquinas desde las variables de entorno
const targets = {};

// Filtrar las variables de entorno que siguen la convención SERVER_<nombre>
Object.keys(process.env).forEach(key => {
  if (key.startsWith('SERVER_')) {
    const serverName = key.replace('SERVER_', '').toLowerCase();
    targets[serverName] = process.env[key];
  }
});

console.log('Targets configurados:', targets);

// Contador para alternar entre las máquinas
let counter = 0;

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  // Parsear el query string
  const queryObject = url.parse(req.url, true).query;

  let target;
  
  // Verificar el parámetro _server en el query string
  if (queryObject._server && targets[queryObject._server]) {
    targetName = queryObject._server;
    target = targets[targetName];
  } else {
    // Alternar entre las máquinas si no se especifica _server
    const targetNames = Object.keys(targets);
    targetName = targetNames[counter % targetNames.length];
    target = targets[targetName];
    counter++;
  }

  console.log(`[${targetName}] ${target} method: ${req.method}, url: ${req.url}`);

  // Redirigir la solicitud al target correspondiente
  proxy.web(req, res, { target });
});

// Escuchar en el puerto 8080
server.listen(PORT, () => {
  console.log(`Gateway corriendo en el puerto ${PORT}`);
});
