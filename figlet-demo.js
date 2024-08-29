var figlet = require("figlet");

figlet("Hello World!!", function (err, data) {
  // 함수명을 지정 안하는 이유 = 여기 외에 다른 곳에서 쓸일 없음
  // 해당 npm 제작자가 매개변수로 함수를 받기로 했음

  // 첫번째 매개변수 "" 문자열을 받아서, 아스키 아트로 만든 다음
  // 두번째 매개변수(함수)를 실행하는 과정 = 콜백(함수)
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});