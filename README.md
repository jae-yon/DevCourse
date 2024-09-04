## 🤖Node.JS + Express 기능 구현 테스트
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">

#### 🗂️ 추가&수정 파일 항목
```
│  app.js // test 라우터 연결
├─public
│  └─json
│        fruits.json // 데이터 테스트 파일
└─routes
        test.js // api 요청 (get/post) 테스트 파일
```

#### 📝 _app.js_
* * *
```js
  /* test 라우터 추가 */
  var testRouter = require('./routes/test');
  app.use('/test', testRouter);
```
#### 📝 _test.js_
* * *
- JSON 파일을 읽어서 맵 객체에 담아오는 코드
```js
  const fs = require('fs');
  const jsonFile = fs.readFileSync('./public/json/fruits.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  
  let db = new Map()
  jsonData.forEach((element, index) => {
    db.set(index, element);
  });
```
- GET 요청에 대한 처리 코드
```js 
  /* 데이터 전체 조회 */
  router.get('/', (req, res) => {    
    res.json([...db.values()]);
  });

  /* 객체 개별(선택) 조회 */
  router.get('/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    if (db.get(id) == undefined) {
      res.send("There is no value");
    } else {
      let arr = db.get(id);
      arr['id'] = id;
      res.json(arr);
    }
  });
```
- POST 요청에 대한 처리 코드
```js
  router.post('/', (req, res) => {
    let id = db.size;
    // DB 객체에 받아온 값 저장
    db.set(id, req.body);
    // JSON 형태로 변환 후 파일로 저장
    fs.writeFileSync('./public/json/fruits.json', JSON.stringify([...db.values()], null, 2));
    // 응답
    res.json({
      message : db.get(id).name + " is tasty!"
    });
  });
```
- POST 요청으로 받아 저장된 JSON 데이터
```json
  {
    "name": "peach",
    "origin": "korea",
    "price": 3100
  }
```