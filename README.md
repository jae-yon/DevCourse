## 🤖Node.JS + Express 기능 구현 테스트 (유튜브 클론 코딩)
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">

🗒️ <span style="background-color:#fff5b1"> [***DB 설계 노션 기록***](https://jae-yon.notion.site/TIL-24-8b6825a2cd1f42268e2955fd8645bdca?pvs=4) </span>

### 🗂️ 추가&수정 파일 항목

##### <span style="background-color:#FFE6E6"> _npm_ </span> ➡️ ***mysql2 & express-validator***

```
├─ app.js
├─ db.js        
└─ routes
    ├─ channels.js
    └─ users.js
```

#### 💾 _db.js_

```js
  // Get the client
  const mysql = require('mysql2');

  // Create the connection to database
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'Youtube',
    timezone: '+09:00',
    dateStrings: true
  });

  module.exports = connection;
```
#### 📑 _라우트(users, channels) 공통 변경 사항_

```js
  const connection = require('../db');
  const {body, param, validationResult} = require('express-validator');
```
- 요청 결과 실패시 호출 함수
```js
  const notFound = (res) => {
    res.status(404).json({
      message : `일치하는 정보를 찾을 수 없습니다`
    })
  }
```
- 유효성 검증 실패시 미들웨어 함수
```js
  const validate = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json({message : err.array()})
    } else {
      return next()
    }
  }
```
- HTTP 메소드 형태 변경 (예시: GET 요청)
```js
  router.get('/',
    // validator
    [
      body('value').notEmpty(), validate
    ],
    // middleware function
    (req, res) => {
      // request value
      const {value} = req.body
      // sql query
      const sql = `SELECT * FROM table WHERE value = ?`
      // db connect
      connection.query(sql, value, function (err, results) {
        if (results.length) {
          res.status(200).json(results[0])
        } else {
          return notFound(res)
        }
      })
    }
  )
```