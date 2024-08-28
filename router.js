function route(path, handle, response, id) {
	if (typeof handle[path] === 'function') {
		handle[path](response, id);
	} else {
		// 통신 상태 코드 (http status code)
		// 200: 전송 신공
		// 400: 요청 실패
		// 404: 문서를 찾을 수 없음 (not found)
		// 500: 서버 내부 오류

		// handler에 해당 path 설정이 없다면 에러 페이지를 호출
    response.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'}); // html > head
    response.write('Not Found'); // html > body
    response.end();
	}
}
// 함수 외부 사용 선언
exports.route = route;