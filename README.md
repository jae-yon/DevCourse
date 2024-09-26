## 🤖Node.JS + Express 기능 구현 테스트
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">

🗒️ <span style="background-color:#fff5b1"> [***DB 설계 노션 기록***](https://jae-yon.notion.site/TIL-24-8b6825a2cd1f42268e2955fd8645bdca?pvs=4) </span>

🗒️ <span style="background-color:#fff5b1"> [***JWT 생성 노션 기록***](https://jae-yon.notion.site/TIL-27-10cc284b1a6280209b8bdd0c90e2fbf7?pvs=4) </span>

### 🗂️ 추가&수정 파일 항목

##### <span style="background-color:#FFE6E6"> _npm_ </span> ➡️ ***mysql2 & express-validator & jsonwebtoken & dotenv***

```
├─ app.js
├─ db.js
├─ .env
└─ routes
    ├─ channels.js
    └─ users.js
```

#### ⚙️ _.env_
```
  # SERVER

  PORT = 3000

  # JWT

  SECRET_KEY = ''

  # DB

  HOST = ''
  DB_PORT = 3306
  USER = ''
  PASSWORD = ''
  DB = ''
```

#### 💾 _db.js_
```js
  var mysql = require('mysql2');
  var dotenv = require('dotenv');
  dotenv.config();

  const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    timezone: '+09:00',
    dateStrings: true
  });

  module.exports = connection;
```

#### 🪙 _JWT 생성 (users.js)_
- _jwt, env_ 모듈 추가
```js
  var jwt = require('jsonwebtoken');
  var dotenv = require('dotenv');
  dotenv.config();
```
- 로그인 시 토큰 생성
```js
  .post('/signin',
    [
      body('email').notEmpty().isString().withMessage('이메일 정보가 없습니다'),
      body('password').notEmpty().isString().withMessage('패스워드 정보가 없습니다'),
      validate
    ],
    (req, res) => {
      const {email, password} = req.body
      const sql = `SELECT * FROM users WHERE email = ?`

      connection.query(sql, email, function (err, results) {
        if (err) return res.status(400).send(err)

        if (results[0] && results[0].password == password) {
          
          const token = jwt.sign(
            { email: results[0].email, name: results[0].name }, 
            process.env.SECRET_KEY,
            { expiresIn : '30m', issuer: 'admin' }
          );

          res.cookie('token', token, { httpOnly : true })

          res.status(200).json({
            message : `${results[0].name}님 환영합니다`,
            token : token
          })
        } else {
          res.status(403).json({
            message : `이메일 또는 패스워드가 일치하지 않습니다`
          })
        }
      })
    }
  )
```
#### 📑 _라우트 공통 변경 사항_
- 유효성 검증 미들웨어 함수
```js
  var {body, param, validationResult} = require('express-validator');

  const validate = (req, res, next) => {
    const err = validationResult(req)
    if (err.isEmpty()) {
      return next()
    } else {
      return res.status(400).json({message : err.array()})
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
