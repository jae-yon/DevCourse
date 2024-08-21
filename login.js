/* 나만의 함수 만들고, 버튼 클릭하면 호출하기 */
const myFunction = () => {
  let id_val = document.getElementById("login_id").value;
  let pw_val = document.getElementById("login_pw").value;
  
  if (!id_val) {
    /* ID 값이 없을 때 */
    alert('ID를 입력해주세요!');
  } else if (!pw_val) {
    /* PW 값이 없을 때 */
    alert('비밀번호를 입력해주세요!');
  } else {
    /* ID 값을 호출 */
    alert(id_val);
  }
}