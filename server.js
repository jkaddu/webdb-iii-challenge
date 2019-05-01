const server = require('server.js');

const helmet = require('helmet');

server.use(helmet());
server.use(express.json());

module.exports = server;
