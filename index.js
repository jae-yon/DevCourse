let server = require('./server');
let router = require('./router');
let handler = require('./handler');

server.start(router.route, handler.handle);