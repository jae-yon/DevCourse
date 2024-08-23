// node.js 내장 모듈
const fs = require('fs');

const mariadb = require('./db/connect/mariadb');

// HTML 페이지 변수
const main_page = fs.readFileSync('./main.html', 'utf-8');
// const orderlist_page = fs.readFileSync('./orderlist.html', 'utf-8');

/* main.html */

function main(response) {
  // DB 호출
  mariadb.query("SELECT * FROM product", function(err, rows) {
    console.log(rows);
  });

  response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); // html > head
  response.write(main_page); // html > body
  response.end();
}

/* order.html */ 

function order(response, productID) {
  response.writeHead(200, {'Content-Type' : 'text/html'});

  mariadb.query("INSERT INTO orderlist VALUES (" + productID + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
      console.log(rows);
  })

  response.write('Thank you for your order! <br> you can check the result on the order list page.');
  response.end(); 
}


/* image files */ 

function redRacket(response) {
  // 이미지 파일 호출
  fs.readFile('./img/redRacket.png', function(err, data) {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(data);
      response.end(); 
  })
}

function blueRacket(response) {
  // 이미지 파일 호출
  fs.readFile('./img/blueRacket.png', function(err, data) {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(data);
      response.end(); 
  })
}

function blackRacket(response) {
  // 이미지 파일 호출
  fs.readFile('./img/blackRacket.png', function(err, data) {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(data);
      response.end(); 
  })
}


function login(response) {
  response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); // html > head
  response.write('This is Login Page'); // html > body
  response.end();
}

let handle = {}; // key: value

handle['/'] = main;
handle['/order'] = order;
handle['/login'] = login;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;
