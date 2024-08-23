const mariadb = require('./db/connect/mariadb');

function main(response) {
  
  // DB 호출
  mariadb.query("SELECT * FROM product", function(err, rows) {
    console.log(rows);
  });

  response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); // html > head
  response.write('김재영'); // html > body
  response.end();
}

function login(response) {
  response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); // html > head
  response.write('This is Login Page'); // html > body
  response.end();
}

// function favicon(response) {
//   response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); // html > head
//   response.write('This is favicon'); // html > body
//   response.end();
// }

let handle = {}; // key: value

handle['/'] = main;
handle['/login'] = login;
// handle['/favicon.ico'] = favicon;

exports.handle = handle;
