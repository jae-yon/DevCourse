## 🤖Node.JS + Express 기능 구현 테스트 (유튜브 클론 코딩)
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">

🗒️ [***유저 API 설계 노션 기록***](https://jae-yon.notion.site/TIL-19-9f15b2feea43472fbc6171ddb2490314?pvs=4)

🗒️ [***채널 API 설계 노션 기록***](https://jae-yon.notion.site/TIL-20-47839d4caa0a4579919dfd3b58b83811?pvs=4)

#### 🗂️ 추가&수정 파일 항목
```
│  app.js // test 라우터 연결
│
├─public
│  └─json
│        channel.json // 채널 API 테스트 데이터
│        fruits.json // 조회 데이터 테스트 파일
│        test.json // 등록, 수정, 삭제 데이터 테스트 파일
└─routes
        channels.js // 채널 라우터
        users.js // 유저 라우터
```

#### 📝 _app.js_
* * *
```js
  /* router */
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var channelsRouter = require('./routes/channels');

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/channels', channelsRouter);
```
#### 📝 _channels.js_
* * *
- _**channels.json**_ 파일을 읽어서 맵 객체에 담아오는 코드
```js
  // JSON 파일 읽어오기
  const fs = require('fs');
  const jsonFile = fs.readFileSync('./public/json/channels.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  // let channels = new Map(Object.entries(jsonData)); => key 값을 string으로 가지고 온다
  
  let channels = new Map();
  
  // JSON 데이터 MAP 객체에 담기
  jsonData.forEach((e) => {
    channels.set(e.id, e)
  });
```
- (등록, 수정, 삭제된)객체를 _**channels.json**_ 파일에 저장하는 코드
```js
  let saveChannel = () => {
    fs.writeFileSync('./public/json/channels.json', JSON.stringify([...channels.values()], null, 2));
  }
```
- 조회, 수정 시에 원하는 객체 값을 찾는 코드
```js
  let findChannel = (id) => {
    return [...channels.values()].find((e) => e.id === id)
  }
```
