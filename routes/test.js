var express = require('express');
var router = express.Router();

// JSON 파일 읽어오기
const fs = require('fs');
const jsonFile = fs.readFileSync('./public/json/fruits.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

let db = new Map()
// 맵 객체에 JSON데이터 담기
jsonData.forEach((element, index) => {
  db.set(index, element);
});

router.get('/', (req, res) => {
  // 객체 전체 조회
  res.json([...db.values()]);
});

// 객체 개별(선택) 조회
router.get('/:id', (req, res) => {
  // 비구조화를 통해 매개변수 값 변수에 선언
  let {id} = req.params;
  id = parseInt(id);
  // 객체 호출
  if (db.get(id) == undefined) {
    res.send("There is no value");
  } else {
    let arr = db.get(id);
    arr['id'] = id;
    res.json(arr);
  }
});

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

module.exports = router;