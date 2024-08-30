const express = require('express')
const app = express()
const port = 3000

let sample = {
  title : "let's study node.js!",
  date : "2024-08-30",
  description : "'express.js' can create web server.",
}

app.listen(port, () => {
  console.log(`Server is running on localhost: ${port}`)
})

app.get('/', (req, res) => {
  res.json(sample)
})

app.get('/route/:parameter', (req, res) => {
  // : => url로 매개변수를 전달해주는 것으로 인식한다.
  // route/__ 빈칸에 오는 값을 parameter 이라는 변수에 담아준다.
  let result = {
    "라우트 파라미터" : req.params.parameter,
    "쿼리 파라미터" : req.query,
  }
  res.json(result)
})
