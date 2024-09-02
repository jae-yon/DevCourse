const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Server is running on localhost: ${port}`)
})

app.get('/:id', (req, res) => {
  // 비구조화를 통해 매개변수 값 변수에 선언
  let {id} = req.params
  // 형변환 String > int
  key = parseInt(id);
  // 객체 호출
  if (db.get(key) === undefined) {
    // 변수 값이 없으면 ...
    res.json({
      message : "there is no value",
    })
  } else {
    res.json({
      key : key,
      name : db.get(key)
    })
  }
})

// 객체 생성
let db = new Map()

db.set(1, 'apple')
db.set(2, 'grape')
db.set(3, 'melon')
db.set(4, 'mango')
db.set(5, 'lemon')

// app.get('/:test', (req, res) => {
//   // : => url로 매개변수를 전달해주는 것으로 인식한다.
//   // route/__ 빈칸에 오는 값을 parameter 이라는 변수에 담아준다.
//   const param = req.params
// 	res.json({
// 		test : param.test
// 	})

//   // 자바스크립트 배열 비구조화
//   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
//   const [num1, num2, , num4, ... num_rest] = array
// })
