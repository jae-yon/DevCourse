let server = require('./server');
let router = require('./router');

server.server(router.route);