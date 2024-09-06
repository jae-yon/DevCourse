## 🤖Node.JS + Express 기능 구현 테스트
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">

🗒️ [***API GET&POST 노션 기록***](https://jae-yon.notion.site/TIL-17-bc349020217b4fab8e3d5134a3f4b0f1?pvs=4)

🗒️ [***API PUT&DELETE 노션 기록***](https://jae-yon.notion.site/TIL-18-827c5dcfb1e441a7945ed0a1f7abfb79?pvs=4)

#### 🗂️ 추가&수정 파일 항목
```
│  app.js // test 라우터 연결
│
├─public
│  └─json
│        fruits.json // 조회 데이터 테스트 파일
│        test.json // 등록, 수정, 삭제 데이터 테스트 파일
└─routes
        test.js // api 요청 테스트 파일
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
- _**fruits.json**_ 파일을 읽어서 맵 객체에 담아오는 코드
```js
  const fs = require('fs');
  const jsonFile = fs.readFileSync('./public/json/fruits.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  
  let db = new Map()
  jsonData.forEach((element, index) => {
    db.set(index, element);
  });
```
- (등록, 수정, 삭제된)객체를 _**test.json**_ 파일에 저장하는 코드
```js
  const saveFile = () => {
    fs.writeFileSync('./public/json/test.json', JSON.stringify([...db.values()], null, 2));
  }
```
- **GET** 요청에 대한 처리 코드
```js 
  // GET : 객체 전체 조회
  router.get('/', (req, res) => {
    if (db.size >= 1) {
      let jsonObject = {}

      db.forEach((value, key) => {
        jsonObject[key] = value;
      });

      res.json(jsonObject);
      // res.json([...db.values()]);
    } else {
      res.json({ message : "This object's value does not exist." });
    }
  });

  // GET : 객체 개별(선택) 조회
  router.get('/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    if (db.get(id) == undefined) {
      res.json({ message : "This value does not exist." });
    } else {
      res.json(db.get(id));
    }
  });
```
- **POST** 요청에 대한 처리 코드
```js
  // POST : 객체 저장
  router.post('/', (req, res) => {
    let id = db.size;
    // 객체 저장
    db.set(id, req.body);
    // JSON 저장
    saveFile();
    // 응답
    res.json({ message : `${db.get(id).name} is tasty!` });
  });
```
- **PUT** 요청에 대한 처리 코드
```js
  // PUT : 객체 개별(선택) 수정
  router.put('/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    
    if (db.get(id) == undefined) {
      res.json({ message : "This value does not exist." });
    } else {
      // 객체 저장(덮어쓰기)
      db.set(id, req.body);
      // JSON 저장
      saveFile();
      // 응답
      res.json({ message : `The values of object ${id} have been changed.` });
    }
  });
```
- **DELETE** 요청에 대한 처리 코드
```js
  // DELETE : 객체 전체 삭제
  router.delete('/', (req, res) => {
    if (db.size >= 1) {
      // 요소 전체 삭제
      db.clear();
      // JSON 저장
      saveFile();
      // 응답
      res.json({ message : "success" });
    } else {
      res.json({ message : "This object's value does not exist." });
    }
  });

  // DELETE : 객체 개별(선택) 삭제
  router.delete('/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    
    if (db.get(id) == undefined) {
      res.json({ message : "This value does not exist." });
    } else {
      // 선택 객체 삭제
      db.delete(id);
      // JSON 저장
      saveFile();
      let jsonObject = {}
      db.forEach((value, key) => {
        jsonObject[key] = value;
      });
      // 응답
      res.json(jsonObject);
    }
  });
```
