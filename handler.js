// node.js 내장 모듈
const fs = require('fs');

const mariadb = require('./db/connect/mariadb');

/* main.html */
const main = (response) => {
  mariadb.query("SELECT * FROM shoes", function(err, res){
    console.log(res);
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(fs.readFileSync('./main.html', 'utf-8'));
  response.end();
}
/* order.html */
const order = (response, id) => {
  if (id != undefined) {
    mariadb.query("INSERT INTO orderlist VALUES (" + id + ", '" + new Date().toLocaleDateString() + "');", function(err, res) {
      // console.log(res);
    });
  }
  response.writeHead(200, {"Content-Type": "text/html"});
  mariadb.query("SELECT orderlist.order_date, shoes.shoes, shoes.price FROM orderlist JOIN shoes ON orderlist.product_id = shoes.id", function(err, res) {
    response.write(fs.readFileSync('./order.html', 'utf-8'));
    res.forEach(element => {
      response.write("<tr>"
                    +"  <td>"+element.order_date+"</td>"
                    +"  <td>"+element.shoes+"</td>"
                    +"  <td>"+element.price+"</td>"
                    +"</tr>");
    });
    response.write(
      "       </tbody>"
      +"    </table>"
      +"  </div>"
      +"</body>"
      +"</html>"
    );
    response.end();
  });
}
/* main.css */
const cssMain = (response) => {
  response.writeHead(200, {"Content-Type": "text/css"});
  response.write(fs.readFileSync('./css/main.css', 'utf-8'));
  response.end();
}
/* index.css */
const cssIndex = (response) => {
  response.writeHead(200, {"Content-Type": "text/css"});
  response.write(fs.readFileSync('./css/index.css', 'utf-8'));
  response.end();
}
/* order.css */
const cssOrder = (response) => {
  response.writeHead(200, {"Content-Type": "text/css"});
  response.write(fs.readFileSync('./css/order.css', 'utf-8'));
  response.end();
}

/* sample images */
const image_01 = (response) => {
  fs.readFile('./img/LA_SPORTIVA_FUTURA.jpg', function(err, res) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(res);
    response.end(); 
  });
}
const image_02 = (response) => {
  fs.readFile('./img/MADROCK_DRONE_2.0.jpg', function(err, res) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(res);
    response.end(); 
  });
}
const image_03 = (response) => {
  fs.readFile('./img/SCARPA_DRAGO_LV.jpg', function(err, res) {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.write(res);
      response.end(); 
  });
}

let handle = {}; // key: value

handle['/'] = main;
handle['/order'] = order;
handle['/css/main.css'] = cssMain;
handle['/css/index.css'] = cssIndex;
handle['/css/order.css'] = cssOrder;

// image files
handle['/img/LA_SPORTIVA_FUTURA.jpg'] = image_01;
handle['/img/MADROCK_DRONE_2.0.jpg'] = image_02;
handle['/img/SCARPA_DRAGO_LV.jpg'] = image_03;

exports.handle = handle;