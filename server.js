// node.js 내장 모듈
let http = require('http');

const start = () => {
  const onRequest = (request, response) => {
    // 통신 상태 코드 (http status code)
    // 200: 전송 신공
    // 400: 요청 실패
    // 404: 문서를 찾을 수 없음 (not found)
    // 500: 서버 내부 오류
    response.writeHead(200, {'Content-Type' : 'text/html'}); // html > head
    response.write('Hello Node.JS!!!'); // html > body
    response.end();
  }
  // 포트번호: TCP/IP 네트워크에서 특정 프로세스나 서비스를 식별하기 위해 사용되는 숫자
  http.createServer(onRequest).listen(8888); // [localhost:8888]
}

// 함수 외부 사용 선언
exports.start = start;
