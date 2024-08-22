// node.js 내장 모듈
const http = require('http');
const url = require('url');

// 포트번호: TCP/IP 네트워크에서 특정 프로세스나 서비스를 식별하기 위해 사용되는 숫자
const port = 80;

// server.js로 실행하지 않고 index.js로부터 실행
function server(route) {
  function onRequest(request, response) {
    // Path: 도메인 뒤에 오는 웹사이트 내의 특정 페이지나 자원의 위치
    let path = url.parse(request.url).pathname;
    route(path);
    // 서버가 실행되었을 때의 결과
    response.writeHead(200, {'Content-Type' : 'text/html'}); // html > head
    response.write('Hello World'); // html > body
    response.end();
  }
  http.createServer(onRequest).listen(port, console.log('Server is running on localhost:' + port));  
}
// 함수 외부 사용 선언
exports.server = server;