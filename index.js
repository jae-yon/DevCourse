const server = require('./server');
const router = require('./router');
const handler = require('./handler');
const mariadb = require('./db/connect/mariadb');

// DB 연결
mariadb.connect();

server.start(router.route, handler.handle);